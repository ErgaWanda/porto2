"use client";
import React, { useState, useMemo, useEffect } from "react";

// ─── Contribution data generator ───────────────────────────
function generateContributionData(): {
  date: Date;
  count: number;
  level: number;
}[] {
  const data: { date: Date; count: number; level: number }[] = [];
  const today = new Date();
  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  const start = new Date(oneYearAgo);
  start.setDate(start.getDate() - start.getDay());

  let seed = 42;
  function seededRandom() {
    seed = (seed * 16807 + 0) % 2147483647;
    return (seed - 1) / 2147483646;
  }

  const burstWeeks = new Set<number>();
  for (let i = 0; i < 12; i++) {
    burstWeeks.add(Math.floor(seededRandom() * 52));
  }

  const current = new Date(start);
  let weekIndex = 0;
  let dayInWeek = 0;

  while (current <= today) {
    const isWeekday = current.getDay() >= 1 && current.getDay() <= 5;
    const isBurstWeek = burstWeeks.has(weekIndex);

    let probability = isWeekday ? 0.45 : 0.15;
    if (isBurstWeek) probability = isWeekday ? 0.85 : 0.4;

    let count = 0;
    if (seededRandom() < probability) {
      if (isBurstWeek) {
        count = Math.floor(seededRandom() * 12) + 3;
      } else {
        count = Math.floor(seededRandom() * 6) + 1;
      }
    }

    let level = 0;
    if (count >= 10) level = 4;
    else if (count >= 6) level = 3;
    else if (count >= 3) level = 2;
    else if (count >= 1) level = 1;

    data.push({ date: new Date(current), count, level });

    current.setDate(current.getDate() + 1);
    dayInWeek++;
    if (dayInWeek >= 7) {
      dayInWeek = 0;
      weekIndex++;
    }
  }

  return data;
}

// ─── Stats calculator ──────────────────────────────────────
function calculateStats(data: { date: Date; count: number }[]) {
  const totalContributions = data.reduce((sum, d) => sum + d.count, 0);

  let currentStreak = 0;
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i].count > 0) currentStreak++;
    else break;
  }

  let longestStreak = 0;
  let tempStreak = 0;
  for (const d of data) {
    if (d.count > 0) {
      tempStreak++;
      if (tempStreak > longestStreak) longestStreak = tempStreak;
    } else {
      tempStreak = 0;
    }
  }

  return { totalContributions, currentStreak, longestStreak };
}

// ─── Colors ────────────────────────────────────────────────
const TOP_COLORS = [
  "#1f2328", // 0 — empty
  "#0e4429", // 1
  "#006d32", // 2
  "#26a641", // 3
  "#39d353", // 4
];

const RIGHT_COLORS = [
  "#171a1d",
  "#0a331f",
  "#005226",
  "#1c7d31",
  "#2aa140",
];

const FRONT_COLORS = [
  "#121417",
  "#072416",
  "#003d1c",
  "#135c24",
  "#1e7b30",
];

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// ─── Component ─────────────────────────────────────────────
export default function GitHubActivity() {
  const [viewMode, setViewMode] = useState<"recent" | "full">("recent");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const allData = useMemo(() => generateContributionData(), []);
  const stats = useMemo(() => calculateStats(allData), [allData]);

  // Group into weeks (columns of 7 days)
  const allWeeks = useMemo(() => {
    const w: { date: Date; count: number; level: number }[][] = [];
    let currentWeek: { date: Date; count: number; level: number }[] = [];

    for (const day of allData) {
      currentWeek.push(day);
      if (day.date.getDay() === 6) {
        w.push(currentWeek);
        currentWeek = [];
      }
    }
    if (currentWeek.length > 0) w.push(currentWeek);
    return w;
  }, [allData]);

  // Month labels
  const monthLabels = useMemo(() => {
    const labels: { label: string; weekIndex: number }[] = [];
    let lastMonth = -1;

    allWeeks.forEach((week, wIdx) => {
      const firstDay = week[0];
      if (firstDay) {
        const month = firstDay.date.getMonth();
        if (month !== lastMonth) {
          labels.push({ label: MONTH_NAMES[month], weekIndex: wIdx });
          lastMonth = month;
        }
      }
    });
    return labels;
  }, [allWeeks]);

  const cellSize = 12;
  const cellGap = 3;
  const depthPerLevel = 4;
  const isIso = viewMode === "recent";

  const recentStartIdx = allWeeks.length - 16;

  return (
    <section className="gh-activity-section" id="aktivitas">
      {/* Floating decorations */}
      <div className="gh-decor">
        <span className="gh-spark gh-spark-1" />
        <span className="gh-spark gh-spark-2" />
        <span className="gh-spark gh-spark-3" />
        <span className="gh-spark gh-spark-4" />
        <span className="gh-diamond gh-diamond-1" />
        <span className="gh-diamond gh-diamond-2" />
      </div>

      <div className="gh-inner">
        {/* Header */}
        <div className="gh-header-label">ACTIVITY</div>
        <h2 className="gh-heading">
          Building in <em>public.</em>
        </h2>

        {/* Graph box */}
        <div className="gh-graph-box">
          {/* Toggle */}
          <div className="gh-toggle">
            <button
              className={`gh-toggle-btn ${isIso ? "active" : ""}`}
              onClick={() => setViewMode("recent")}
            >
              Recent
            </button>
            <button
              className={`gh-toggle-btn ${!isIso ? "active" : ""}`}
              onClick={() => setViewMode("full")}
            >
              Full Year
            </button>
          </div>

          {/* Grid wrapper */}
          <div className="gh-graph-viewport">
            {mounted && (
              <div
                className={`gh-grid-wrapper ${isIso ? "gh-iso" : "gh-flat"}`}
                style={
                  {
                    "--cols": allWeeks.length,
                    "--cell": `${cellSize}px`,
                    "--gap": `${cellGap}px`,
                  } as React.CSSProperties
                }
              >
                {allWeeks.map((week, wIdx) => {
                  const isRecent = wIdx >= recentStartIdx;
                  return (
                    <div
                      key={wIdx}
                      className={`gh-column ${isRecent ? "gh-recent" : "gh-old"}`}
                    >
                      {week.map((day, dIdx) => {
                        const level = day ? day.level : 0;
                        const depth = level > 0 ? level * depthPerLevel : 1;

                        return (
                          <div
                            key={dIdx}
                            className="gh-cell"
                            style={
                              {
                                "--top-color": TOP_COLORS[level],
                                "--right-color": RIGHT_COLORS[level],
                                "--front-color": FRONT_COLORS[level],
                                "--depth": `${depth}px`,
                              } as React.CSSProperties
                            }
                            title={
                              day
                                ? `${day.date.toLocaleDateString("id-ID", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  })}: ${day.count} kontribusi`
                                : ""
                            }
                          >
                            <div className="gh-cube">
                              {/* Only render 3D faces when Recent mode is active OR if the cell is one of the recent weeks */}
                              {isIso && isRecent ? (
                                <>
                                  <div className="gh-cube-top" />
                                  <div className="gh-cube-right" />
                                  <div className="gh-cube-front" />
                                </>
                              ) : (
                                // Flat cell is just a single div with the top color to optimize rendering speed
                                <div
                                  style={{
                                    position: "absolute",
                                    inset: 0,
                                    backgroundColor: TOP_COLORS[level],
                                    borderRadius: "1.5px",
                                    transition: "background-color 0.3s",
                                  }}
                                />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Month labels */}
          <div className="gh-months">
            {monthLabels.map((m, idx) => {
              const nextWeekIdx =
                idx < monthLabels.length - 1
                  ? monthLabels[idx + 1].weekIndex
                  : allWeeks.length;
              const span = nextWeekIdx - m.weekIndex;

              return (
                <span
                  key={idx}
                  className="gh-month-label"
                  style={{
                    flex: span,
                    transition: "opacity 0.4s ease",
                    opacity: isIso
                      ? m.weekIndex >= recentStartIdx
                        ? 1
                        : 0.1
                      : 1,
                  }}
                >
                  {m.label}
                </span>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="gh-stats">
          <div className="gh-stat-card">
            <span className="gh-stat-label">CONTRIBUTIONS</span>
            <div className="gh-stat-value">
              {stats.totalContributions.toLocaleString()}
            </div>
            <svg className="gh-stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </div>
          <div className="gh-stat-card">
            <span className="gh-stat-label">STREAK</span>
            <div className="gh-stat-value">
              {stats.currentStreak}
              <span className="gh-stat-unit">days</span>
            </div>
            <svg className="gh-stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <div className="gh-stat-card">
            <span className="gh-stat-label">LONGEST</span>
            <div className="gh-stat-value">
              {stats.longestStreak}
              <span className="gh-stat-unit">days</span>
            </div>
            <svg className="gh-stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
