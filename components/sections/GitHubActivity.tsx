"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { FaGithub, FaExternalLinkAlt, FaFire, FaCalendarAlt, FaCodeBranch } from "react-icons/fa";

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

const MONTH_NAMES = [
  "Sep", "Oct", "Nov", "Dec", "Jan", "Feb",
  "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"
];

// GitHub Authentic Palette (Dark Theme matching user's screenshot)
const LEVEL_COLORS = [
  "#161B22", // Level 0: Empty / Dark
  "#0E4429", // Level 1: Low Green
  "#006D32", // Level 2: Medium-low Green
  "#26A641", // Level 3: Medium-high Green
  "#39D353", // Level 4: High Green
];

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

  return (
    <section className="relative z-10" id="github-activity" style={{ padding: "10px 0 45px 0" }}>
      <div className="container-premium">

        {/* Section Header (Cartoon Neubrutalism) */}
        <div className="brutal-section-title-box" style={{ marginBottom: "24px" }}>
          <div>
            <div style={{ fontFamily: "var(--font-cartoon)", fontSize: "12px", color: "#16A34A", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "6px", fontWeight: 700 }}>
              // AKTIVITAS OPEN SOURCE &amp; KODE
            </div>
            <h2 style={{ fontFamily: "var(--font-cartoon-title)", fontSize: "clamp(32px, 4.5vw, 44px)", letterSpacing: "0.02em", margin: 0, lineHeight: 1.1, color: "#0F172A" }}>
              KONTRIBUSI <span style={{ color: "#16A34A" }}>GITHUB</span>
            </h2>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <span className="brutal-sticker" style={{ background: "#DCFCE7", border: "2.5px solid #000000", color: "#15803D", fontWeight: 800 }}>
              ⚡ {totalCount}+ KONTRIBUSI TAHUN INI
            </span>
            <a
              href="https://github.com/ErgaWanda"
              target="_blank"
              rel="noopener noreferrer"
              className="brutal-sticker hover:translate-x-0.5 hover:-translate-y-0.5 transition-transform"
              style={{ background: "#0F172A", border: "2.5px solid #000000", color: "#FFFFFF", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}
            >
              <FaGithub size={14} />
              <span>@ErgaWanda</span>
              <FaExternalLinkAlt size={10} style={{ opacity: 0.7 }} />
            </a>
          </div>
        </div>

        {/* Main GitHub Calendar Outer Container (Authentic GitHub Dark Theme) */}
        <div
          style={{
            background: "#0D1117",
            border: "2.5px solid #000000",
            boxShadow: "4px 4px 0px #000000",
            borderRadius: "10px",
            padding: "20px 24px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Top telemetry bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "16px",
              paddingBottom: "12px",
              borderBottom: "1px solid #21262D",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "6px",
                  background: "#161B22",
                  border: "1.5px solid #30363D",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#F0F6FC",
                }}
              >
                <FaGithub size={16} />
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "#F0F6FC", fontWeight: 800, letterSpacing: "0.02em" }}>
                  github.com/ErgaWanda
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#8B949E" }}>
                  Public Contributions &amp; Commits Calendar
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "#161B22",
                  border: "1px solid #30363D",
                  borderRadius: "20px",
                  padding: "4px 10px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  color: isLiveLoaded ? "#39D353" : "#8B949E",
                  fontWeight: 700,
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: isLiveLoaded ? "#39D353" : "#16A34A",
                    boxShadow: isLiveLoaded ? "0 0 8px #39D353" : "none",
                  }}
                />
                {isLiveLoaded ? "LIVE SYNCED" : "DATA AKTIF"}
              </span>
            </div>
          </div>

          {/* Scrollable Calendar Area */}
          <div
            ref={scrollRef}
            style={{
              overflowX: "auto",
              paddingBottom: "8px",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <div style={{ minWidth: "750px" }}>
              {/* Month Labels Header */}
              <div
                style={{
                  display: "flex",
                  marginLeft: "34px",
                  marginBottom: "6px",
                  height: "16px",
                  position: "relative",
                }}
              >
                {monthLabels.map((m, i) => (
                  <span
                    key={i}
                    style={{
                      position: "absolute",
                      left: `${m.colIndex * 14}px`,
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      color: "#8B949E",
                      fontWeight: 600,
                      userSelect: "none",
                    }}
                  >
                    {m.name}
                  </span>
                ))}
              </div>

              {/* Main Days Grid with Mon, Wed, Fri row indicators */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "6px" }}>
                {/* Day Labels Column (Mon, Wed, Fri) */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "3px",
                    width: "28px",
                    textAlign: "right",
                    paddingRight: "4px",
                    userSelect: "none",
                  }}
                >
                  <span style={{ height: "11px", lineHeight: "11px", fontSize: "9px", fontFamily: "var(--font-mono)", color: "transparent" }}>Sun</span>
                  <span style={{ height: "11px", lineHeight: "11px", fontSize: "9px", fontFamily: "var(--font-mono)", color: "#8B949E", fontWeight: 600 }}>Mon</span>
                  <span style={{ height: "11px", lineHeight: "11px", fontSize: "9px", fontFamily: "var(--font-mono)", color: "transparent" }}>Tue</span>
                  <span style={{ height: "11px", lineHeight: "11px", fontSize: "9px", fontFamily: "var(--font-mono)", color: "#8B949E", fontWeight: 600 }}>Wed</span>
                  <span style={{ height: "11px", lineHeight: "11px", fontSize: "9px", fontFamily: "var(--font-mono)", color: "transparent" }}>Thu</span>
                  <span style={{ height: "11px", lineHeight: "11px", fontSize: "9px", fontFamily: "var(--font-mono)", color: "#8B949E", fontWeight: 600 }}>Fri</span>
                  <span style={{ height: "11px", lineHeight: "11px", fontSize: "9px", fontFamily: "var(--font-mono)", color: "transparent" }}>Sat</span>
                </div>

                {/* Weeks Columns */}
                <div style={{ display: "flex", gap: "3px" }}>
                  {weeks.map((week, wIdx) => (
                    <div
                      key={wIdx}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "3px",
                      }}
                    >
                      {/* For first week if it starts after Sunday, pad empty spots */}
                      {wIdx === 0 && week.length > 0 && week[0].dayOfWeek > 0 && (
                        Array.from({ length: week[0].dayOfWeek }).map((_, padIdx) => (
                          <div
                            key={`pad-start-${padIdx}`}
                            style={{
                              width: "11px",
                              height: "11px",
                              visibility: "hidden",
                            }}
                          />
                        ))
                      )}

                      {week.map((day) => {
                        const cellColor = LEVEL_COLORS[day.level] || LEVEL_COLORS[0];
                        return (
                          <div
                            key={day.dateStr}
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
                            style={{
                              width: "11px",
                              height: "11px",
                              borderRadius: "2px",
                              backgroundColor: cellColor,
                              outline: "1px solid rgba(255, 255, 255, 0.05)",
                              outlineOffset: "-1px",
                              cursor: "pointer",
                              transition: "transform 0.15s ease, outline-color 0.15s ease",
                            }}
                            className="hover:scale-125 hover:outline-[#39D353]"
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Calendar Bottom Footer (Matching User Screenshot) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "16px",
              paddingTop: "12px",
              borderTop: "1px solid #21262D",
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "#8B949E",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <a
              href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/why-are-my-contributions-not-showing-up-on-my-profile"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#8B949E",
                textDecoration: "none",
                fontSize: "11px",
              }}
              className="hover:text-[#58A6FF] hover:underline"
            >
              Learn how we count contributions
            </a>

            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <span style={{ marginRight: "4px", fontSize: "11px" }}>Less</span>
              {LEVEL_COLORS.map((col, idx) => (
                <div
                  key={idx}
                  style={{
                    width: "11px",
                    height: "11px",
                    borderRadius: "2px",
                    backgroundColor: col,
                    outline: "1px solid rgba(255, 255, 255, 0.05)",
                    outlineOffset: "-1px",
                  }}
                  title={`Level ${idx}`}
                />
              ))}
              <span style={{ marginLeft: "4px", fontSize: "11px" }}>More</span>
            </div>
          </div>
        </div>

        {/* Quick Highlights / Stat Cards (Neubrutalism Cards) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "14px",
            marginTop: "16px",
          }}
        >
          <div
            style={{
              background: "#FFFFFF",
              border: "2px solid #000000",
              boxShadow: "3px 3px 0px #000000",
              borderRadius: "6px",
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div style={{ width: "36px", height: "36px", borderRadius: "4px", background: "#DCFCE7", border: "1.5px solid #000000", display: "flex", alignItems: "center", justifyContent: "center", color: "#16A34A" }}>
              <FaCodeBranch size={16} />
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#64748B", fontWeight: 700 }}>TOTAL KONTRIBUSI</div>
              <div style={{ fontFamily: "var(--font-cartoon-title)", fontSize: "20px", color: "#0F172A", lineHeight: 1.1 }}>
                {totalCount} <span style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "#16A34A" }}>Commits</span>
              </div>
            </div>
          </div>

          <div
            style={{
              background: "#FFFFFF",
              border: "2px solid #000000",
              boxShadow: "3px 3px 0px #000000",
              borderRadius: "6px",
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div style={{ width: "36px", height: "36px", borderRadius: "4px", background: "#FEF9C3", border: "1.5px solid #000000", display: "flex", alignItems: "center", justifyContent: "center", color: "#CA8A04" }}>
              <FaCalendarAlt size={16} />
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#64748B", fontWeight: 700 }}>HARI AKTIF</div>
              <div style={{ fontFamily: "var(--font-cartoon-title)", fontSize: "20px", color: "#0F172A", lineHeight: 1.1 }}>
                {Object.keys(dataMap).length} <span style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "#CA8A04" }}>Hari</span>
              </div>
            </div>
          </div>

          <div
            style={{
              background: "#FFFFFF",
              border: "2px solid #000000",
              boxShadow: "3px 3px 0px #000000",
              borderRadius: "6px",
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div style={{ width: "36px", height: "36px", borderRadius: "4px", background: "#FEE2E2", border: "1.5px solid #000000", display: "flex", alignItems: "center", justifyContent: "center", color: "#DC2626" }}>
              <FaFire size={16} />
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#64748B", fontWeight: 700 }}>PEAK HARIAN TERTINGGI</div>
              <div style={{ fontFamily: "var(--font-cartoon-title)", fontSize: "20px", color: "#0F172A", lineHeight: 1.1 }}>
                25 <span style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "#DC2626" }}>Commits/Hari</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Floating Tooltip */}
        {hoveredDay && (
          <div
            style={{
              position: "fixed",
              left: `${hoveredDay.x}px`,
              top: `${hoveredDay.y - 36}px`,
              transform: "translateX(-50%)",
              background: "#1F242C",
              color: "#F0F6FC",
              padding: "4px 8px",
              borderRadius: "4px",
              fontSize: "11px",
              fontFamily: "var(--font-mono)",
              pointerEvents: "none",
              zIndex: 9999,
              boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
              border: "1px solid #30363D",
              whiteSpace: "nowrap",
            }}
          >
            <strong>{hoveredDay.count} kontribusi</strong> pada {formatDate(hoveredDay.date)}
          </div>
        )}

      </div>
    </section>
  );
}

