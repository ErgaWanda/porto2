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

// GitHub Authentic Glassmorphism Palette (Nature Frosted Glass Theme)
const LEVEL_COLORS = [
  "rgba(255, 255, 255, 0.09)", // Level 0: Pure Frosted Glass Tile
  "rgba(34, 197, 94, 0.45)",  // Level 1: Soft Emerald Glass
  "rgba(34, 197, 94, 0.75)",  // Level 2: Medium Emerald Glass
  "#22c55e",                   // Level 3: Vivid Emerald
  "#4ade80",                   // Level 4: Brilliant Mint Emerald
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
    <div style={{ width: "100%", position: "relative" }}>
      {/* Section Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: "20px",
          marginBottom: "28px",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <span
              style={{
                background: "rgba(34, 197, 94, 0.18)",
                border: "1px solid rgba(34, 197, 94, 0.4)",
                color: "#4ade80",
                fontFamily: "var(--font-family-mono)",
                fontSize: "11px",
                fontWeight: 700,
                padding: "4px 12px",
                borderRadius: "9999px",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                letterSpacing: "0.04em",
              }}
            >
              // TELEMETRI KONTRIBUSI GITHUB
            </span>
          </div>
          <h2
            style={{
              fontFamily: "var(--font-family-display)",
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.03em",
              margin: 0,
              lineHeight: 1.15,
            }}
          >
            Aktivitas Open Source &amp; Code Repository
          </h2>
          <p
            style={{
              fontFamily: "var(--font-family-body)",
              fontSize: "14.5px",
              color: "rgba(255, 255, 255, 0.72)",
              marginTop: "8px",
              marginBottom: 0,
              maxWidth: "650px",
            }}
          >
            Catatan komit publik nyata, konsistensi rekayasa kode, dan kontribusi repositori aktif selama 12 bulan terakhir.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          <span
            style={{
              background: "rgba(255, 255, 255, 0.10)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
              color: "#ffffff",
              fontFamily: "var(--font-family-mono)",
              fontSize: "12px",
              fontWeight: 700,
              padding: "7px 16px",
              borderRadius: "9999px",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 4px 14px rgba(0, 0, 0, 0.15)",
            }}
          >
            ⚡ {totalCount}+ KONTRIBUSI TAHUN INI
          </span>
          <a
            href="https://github.com/ErgaWanda"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(255, 255, 255, 0.12)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              color: "#ffffff",
              fontFamily: "var(--font-family-mono)",
              fontSize: "12px",
              fontWeight: 700,
              padding: "7px 16px",
              borderRadius: "9999px",
              boxShadow: "0 4px 14px rgba(0, 0, 0, 0.15)",
              transition: "all 0.2s ease",
            }}
            className="hover:scale-105"
          >
            <FaGithub size={15} />
            <span>@ErgaWanda → GitHub</span>
            <FaExternalLinkAlt size={10} style={{ opacity: 0.7 }} />
          </a>
        </div>
      </div>

      {/* Main GitHub Calendar Outer Container (Pure Liquid Glass) */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(28px) saturate(140%)",
          WebkitBackdropFilter: "blur(28px) saturate(140%)",
          border: "1px solid rgba(255, 255, 255, 0.22)",
          borderTop: "1.5px solid rgba(255, 255, 255, 0.5)",
          borderRadius: "20px",
          padding: "20px 24px",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.35)",
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
            borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "8px",
                background: "rgba(255, 255, 255, 0.14)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
              }}
            >
              <FaGithub size={16} />
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-family-mono)", fontSize: "12.5px", color: "#ffffff", fontWeight: 800, letterSpacing: "0.02em" }}>
                github.com/ErgaWanda
              </div>
              <div style={{ fontFamily: "var(--font-family-mono)", fontSize: "10px", color: "rgba(255, 255, 255, 0.65)" }}>
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
                background: "rgba(34, 197, 94, 0.18)",
                border: "1px solid rgba(34, 197, 94, 0.45)",
                borderRadius: "20px",
                padding: "4px 10px",
                fontFamily: "var(--font-family-mono)",
                fontSize: "10px",
                color: isLiveLoaded ? "#4ade80" : "rgba(255, 255, 255, 0.7)",
                fontWeight: 700,
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: isLiveLoaded ? "#4ade80" : "rgba(255, 255, 255, 0.6)",
                  boxShadow: isLiveLoaded ? "0 0 8px #22c55e" : "none",
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

          {/* Calendar Bottom Footer */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "16px",
              paddingTop: "12px",
              borderTop: "1px solid rgba(255, 255, 255, 0.12)",
              fontFamily: "var(--font-family-mono)",
              fontSize: "11px",
              color: "rgba(255, 255, 255, 0.7)",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <a
              href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/why-are-my-contributions-not-showing-up-on-my-profile"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "rgba(255, 255, 255, 0.7)",
                textDecoration: "none",
                fontSize: "11px",
              }}
              className="hover:text-white hover:underline"
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
                    borderRadius: "2.5px",
                    backgroundColor: col,
                    outline: "1px solid rgba(255, 255, 255, 0.12)",
                    outlineOffset: "-1px",
                  }}
                  title={`Level ${idx}`}
                />
              ))}
              <span style={{ marginLeft: "4px", fontSize: "11px" }}>More</span>
            </div>
          </div>
        </div>

        {/* Stat Cards (Nature Frosted Glass Theme) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "14px",
            marginTop: "18px",
          }}
        >
          {/* Commits Card */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.09)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.22)",
              borderTop: "1.5px solid rgba(255, 255, 255, 0.45)",
              borderRadius: "16px",
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              gap: "14px",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.25)",
            }}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "10px",
                background: "rgba(34, 197, 94, 0.2)",
                border: "1px solid rgba(34, 197, 94, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#4ade80",
                flexShrink: 0,
              }}
            >
              <FaCodeBranch size={18} />
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-family-mono)", fontSize: "10.5px", color: "rgba(255, 255, 255, 0.65)", fontWeight: 700, letterSpacing: "0.04em" }}>
                TOTAL KONTRIBUSI
              </div>
              <div style={{ fontFamily: "var(--font-family-display)", fontSize: "22px", fontWeight: 800, color: "#ffffff", lineHeight: 1.1, marginTop: "2px" }}>
                {totalCount} <span style={{ fontSize: "12px", fontFamily: "var(--font-family-mono)", color: "#4ade80", fontWeight: 700 }}>Commits</span>
              </div>
            </div>
          </div>

          {/* Active Days Card */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.09)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.22)",
              borderTop: "1.5px solid rgba(255, 255, 255, 0.45)",
              borderRadius: "16px",
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              gap: "14px",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.25)",
            }}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "10px",
                background: "rgba(245, 158, 11, 0.2)",
                border: "1px solid rgba(245, 158, 11, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fbbf24",
                flexShrink: 0,
              }}
            >
              <FaCalendarAlt size={18} />
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-family-mono)", fontSize: "10.5px", color: "rgba(255, 255, 255, 0.65)", fontWeight: 700, letterSpacing: "0.04em" }}>
                HARI AKTIF
              </div>
              <div style={{ fontFamily: "var(--font-family-display)", fontSize: "22px", fontWeight: 800, color: "#ffffff", lineHeight: 1.1, marginTop: "2px" }}>
                {Object.keys(dataMap).length} <span style={{ fontSize: "12px", fontFamily: "var(--font-family-mono)", color: "#fbbf24", fontWeight: 700 }}>Hari</span>
              </div>
            </div>
          </div>

          {/* Peak Day Card */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.09)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.22)",
              borderTop: "1.5px solid rgba(255, 255, 255, 0.45)",
              borderRadius: "16px",
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              gap: "14px",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.25)",
            }}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "10px",
                background: "rgba(239, 68, 68, 0.2)",
                border: "1px solid rgba(239, 68, 68, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#f87171",
                flexShrink: 0,
              }}
            >
              <FaFire size={18} />
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-family-mono)", fontSize: "10.5px", color: "rgba(255, 255, 255, 0.65)", fontWeight: 700, letterSpacing: "0.04em" }}>
                PEAK HARIAN TERTINGGI
              </div>
              <div style={{ fontFamily: "var(--font-family-display)", fontSize: "22px", fontWeight: 800, color: "#ffffff", lineHeight: 1.1, marginTop: "2px" }}>
                25 <span style={{ fontSize: "12px", fontFamily: "var(--font-family-mono)", color: "#f87171", fontWeight: 700 }}>Commits/Hari</span>
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
              background: "rgba(8, 24, 15, 0.94)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              color: "#ffffff",
              padding: "6px 12px",
              borderRadius: "8px",
              fontSize: "11px",
              fontFamily: "var(--font-family-mono)",
              pointerEvents: "none",
              zIndex: 9999,
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
              whiteSpace: "nowrap",
            }}
          >
            <strong>{hoveredDay.count} kontribusi</strong> pada {formatDate(hoveredDay.date)}
          </div>
        )}
    </div>
  );
}
