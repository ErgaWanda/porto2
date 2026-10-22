"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { FaGithub, FaExternalLinkAlt, FaFire, FaBolt, FaCalendarAlt, FaCodeBranch } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { SectionHead } from "@/components/landing/SectionHead";
import { Reveal } from "@/components/landing/Reveal";
import "@/styles/github.css";

function AnimatedNumber({ value, inView }: { value: number; inView: boolean }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let startTimestamp: number | null = null;
    const duration = 1200;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplayValue(Math.floor(ease * value));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    const animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [value, inView]);

  return <>{displayValue}</>;
}

interface DayData {
  date: string;
  count: number;
  level: number;
}

// Static baseline data for ErgaWanda (105 commits in last 12 months)
// Ensures instant, zero-flicker initial render before client fetch
const INITIAL_ACTIVE_DAYS: Record<string, { count: number; level: number }> = {
  "2025-12-01": { count: 1, level: 1 },
  "2026-06-09": { count: 6, level: 4 },
  "2026-06-21": { count: 1, level: 1 },
  "2026-06-22": { count: 2, level: 2 },
  "2026-06-28": { count: 4, level: 3 },
  "2026-06-29": { count: 5, level: 4 },
  "2026-07-02": { count: 1, level: 1 },
  "2026-07-08": { count: 25, level: 4 },
  "2026-07-09": { count: 15, level: 4 },
  "2026-07-14": { count: 2, level: 2 },
  "2026-07-15": { count: 3, level: 2 },
  "2026-07-17": { count: 1, level: 1 },
  "2026-07-19": { count: 1, level: 1 },
  "2026-07-23": { count: 21, level: 4 },
  "2026-07-24": { count: 1, level: 1 },
  "2026-07-25": { count: 2, level: 2 },
  "2026-07-27": { count: 5, level: 4 },
  "2026-07-30": { count: 2, level: 2 },
  "2026-08-31": { count: 3, level: 2 },
  "2026-09-08": { count: 2, level: 2 },
  "2026-09-11": { count: 2, level: 2 },
};

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DAY_LABEL_ROWS = [1, 3, 5];
const LEGEND_LEVELS = [0, 1, 2, 3, 4];

export default function GitHubActivity() {
  const [dataMap, setDataMap] = useState<Record<string, { count: number; level: number }>>(INITIAL_ACTIVE_DAYS);
  const [totalCount, setTotalCount] = useState<number>(105);
  const [isLiveLoaded, setIsLiveLoaded] = useState<boolean>(false);
  const [hoveredDay, setHoveredDay] = useState<{ date: string; count: number; x: number; y: number } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Fetch live contributions on mount
  useEffect(() => {
    let isMounted = true;
    fetch("https://github-contributions-api.jogruber.de/v4/ErgaWanda?y=last")
      .then((res) => {
        if (!res.ok) throw new Error("API network error");
        return res.json();
      })
      .then((resData) => {
        if (!isMounted || !resData || !Array.isArray(resData.contributions)) return;

        const map: Record<string, { count: number; level: number }> = {};
        let total = 0;
        resData.contributions.forEach((c: DayData) => {
          if (c.count > 0) {
            map[c.date] = { count: c.count, level: c.level };
            total += c.count;
          }
        });

        setDataMap(map);
        setTotalCount(total || 105);
        setIsLiveLoaded(true);
      })
      .catch(() => {
        // Keep initial fallback on network error
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Auto-scroll calendar to right on mobile so latest commits are immediately visible
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, []);

  // Construct 53 weeks (Sunday to Saturday) covering the past 365 days
  const { weeks, monthLabels } = useMemo(() => {
    const today = new Date();
    const end = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    // Go back ~52 weeks from the current week's Saturday
    const endDayOfWeek = end.getDay();
    const start = new Date(end);
    start.setDate(end.getDate() - (52 * 7 + endDayOfWeek));

    const weeksArr: { dateStr: string; dateObj: Date; dayOfWeek: number; count: number; level: number }[][] = [];
    let currentWeek: { dateStr: string; dateObj: Date; dayOfWeek: number; count: number; level: number }[] = [];

    const cur = new Date(start);
    while (cur <= end) {
      const year = cur.getFullYear();
      const month = String(cur.getMonth() + 1).padStart(2, "0");
      const day = String(cur.getDate()).padStart(2, "0");
      const dateStr = `${year}-${month}-${day}`;

      const activeInfo = dataMap[dateStr];
      const count = activeInfo ? activeInfo.count : 0;
      const level = activeInfo ? activeInfo.level : 0;

      currentWeek.push({
        dateStr,
        dateObj: new Date(cur),
        dayOfWeek: cur.getDay(),
        count,
        level,
      });

      if (cur.getDay() === 6 || cur.getTime() === end.getTime()) {
        weeksArr.push(currentWeek);
        currentWeek = [];
      }

      cur.setDate(cur.getDate() + 1);
    }
    if (currentWeek.length > 0) {
      weeksArr.push(currentWeek);
    }

    // Compute month labels aligned with weeks
    const labels: { colIndex: number; name: string }[] = [];
    let prevMonth = -1;

    weeksArr.forEach((w, wIdx) => {
      const firstDay = w[0];
      if (firstDay) {
        const m = firstDay.dateObj.getMonth();
        if (m !== prevMonth && wIdx <= weeksArr.length - 2) {
          const monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          labels.push({ colIndex: wIdx, name: monthShortNames[m] });
          prevMonth = m;
        }
      }
    });

    return { weeks: weeksArr, monthLabels: labels };
  }, [dataMap]);

  // Format date helper for tooltip
  const formatDate = (dateStr: string) => {
    try {
      const [y, m, d] = dateStr.split("-").map(Number);
      const date = new Date(y, m - 1, d);
      return date.toLocaleDateString("id-ID", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const [sectionRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const peakDay = Object.values(dataMap).reduce((max, d) => Math.max(max, d.count), 0);

  const stats = [
    { key: "commits", Icon: FaCodeBranch, label: "Total commits", unit: "Commits", value: totalCount },
    { key: "days", Icon: FaCalendarAlt, label: "Active coding days", unit: "Days", value: Object.keys(dataMap).length },
    { key: "peak", Icon: FaFire, label: "Peak daily commits", unit: "Commits/Day", value: peakDay },
  ];

  return (
    <section id="github" data-hue="moss" ref={sectionRef} className="band-bleed gh">
      <div className="sheet">
        <SectionHead
          index="06"
          title="Commit velocity & code consistency"
          subtitle="Catatan komit publik nyata, konsistensi rekayasa kode, dan kontribusi repositori aktif selama 12 bulan terakhir."
          meta="GitHub activity // repository metrics & commits"
          actions={
            <div className="row gh__actions">
              <span className="chip chip--acid">
                <FaBolt size={11} />
                {totalCount}+ commits recorded
              </span>
              <a
                className="btn btn--sm"
                href="https://github.com/ErgaWanda"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub size={14} className="btn__icon" />
                @ErgaWanda → GitHub
                <FaExternalLinkAlt size={10} className="btn__icon" />
              </a>
            </div>
          }
        />

        <Reveal className="bento gh__grid">
          {/* ── Contribution heatmap ─────────────────────── */}
          <article className="gh__heatmap">
            <div className="cell__head">
              <div className="row row--tight">
                <span className="gh__glyph gh__glyph--mark">
                  <FaGithub size={18} />
                </span>
                <div className="col">
                  <span className="mono mono--ink">github.com/ErgaWanda</span>
                  <span className="mono">Public contributions &amp; commits stream // verified activity</span>
                </div>
              </div>

              <span className="chip">
                <span className={`gh__dot${isLiveLoaded ? " gh__dot--live" : ""}`} aria-hidden="true" />
                {isLiveLoaded ? "Live data connected" : "Offline cached"}
              </span>
            </div>

            <div className="gh__scroll" ref={scrollRef}>
              <div className="gh__cal" style={{ ["--weeks" as string]: weeks.length }}>
                {/* Month labels, one per week column */}
                <div className="gh__months" aria-hidden="true">
                  {monthLabels.map((m) => (
                    <span
                      key={`${m.name}-${m.colIndex}`}
                      className="mono gh__month"
                      style={{ ["--col" as string]: m.colIndex + 1 }}
                    >
                      {m.name}
                    </span>
                  ))}
                </div>

                <div className="gh__body">
                  {/* Day indicators: Mon / Wed / Fri */}
                  <div className="gh__dows" aria-hidden="true">
                    {DAY_LABELS.map((label, idx) => (
                      <span
                        key={label}
                        className={`mono gh__dow${DAY_LABEL_ROWS.includes(idx) ? "" : " gh__dow--blank"}`}
                      >
                        {label}
                      </span>
                    ))}
                  </div>

                  {/* Week columns */}
                  <div className="gh__cells">
                    {weeks.map((week, wIdx) => (
                      <div key={wIdx} className="gh__week">
                        {wIdx === 0 && week.length > 0 && week[0].dayOfWeek > 0 && (
                          Array.from({ length: week[0].dayOfWeek }).map((_, padIdx) => (
                            <span key={`pad-start-${padIdx}`} className="gh__cell gh__cell--pad" />
                          ))
                        )}

                        {week.map((day) => (
                          <span
                            key={day.dateStr}
                            className={`gh__cell gh__lv--${day.level}`}
                            role="img"
                            aria-label={`${day.count} kontribusi pada ${formatDate(day.dateStr)}`}
                            onMouseEnter={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              setHoveredDay({
                                date: day.dateStr,
                                count: day.count,
                                x: rect.left + rect.width / 2,
                                y: rect.top,
                              });
                            }}
                            onMouseLeave={() => setHoveredDay(null)}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="gh__foot">
              <a
                className="gh__link"
                href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/why-are-my-contributions-not-showing-up-on-my-profile"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn how we count contributions
              </a>

              <div className="row row--tight">
                <span className="gh__foot-label">Less</span>
                {LEGEND_LEVELS.map((idx) => (
                  <span key={idx} className={`gh__sw gh__lv--${idx}`} title={`Level ${idx}`} />
                ))}
                <span className="gh__foot-label">More</span>
              </div>
            </div>
          </article>

          {/* ── Telemetry cells ──────────────────────────── */}
          {stats.map(({ key, Icon, label, unit, value }) => (
            <article key={key} className={`gh__stat gh__stat--${key}`}>
              <span className="gh__glyph">
                <Icon size={18} />
              </span>
              <div className="stat">
                <span className="stat__num">
                  <AnimatedNumber value={value} inView={inView} />{" "}
                  <span className="gh__stat-unit">{unit}</span>
                </span>
                <span className="stat__label">{label}</span>
              </div>
            </article>
          ))}
        </Reveal>
      </div>

      {/* Interactive floating tooltip */}
      {hoveredDay && (
        <div
          className="gh__tip"
          aria-hidden="true"
          style={{
            ["--tip-x" as string]: `${hoveredDay.x}px`,
            ["--tip-y" as string]: `${hoveredDay.y - 38}px`,
          }}
        >
          <strong>{hoveredDay.count} kontribusi</strong> pada {formatDate(hoveredDay.date)}
        </div>
      )}
    </section>
  );
}
