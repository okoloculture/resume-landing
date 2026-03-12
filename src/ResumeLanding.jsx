import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Code2,
  Database,
  Server,
  Cloud,
  Terminal,
  GitBranch,
  Mail,
  MapPin,
  Globe,
  ChevronRight,
  ExternalLink,
  Zap,
  Layers,
  Shield,
  Activity,
  Send,
  Briefcase,
  GraduationCap,
  Award,
  MessageSquare,
} from "lucide-react";

const FONT_LINK = "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700;800&display=swap";

// ─── Theme ───
const theme = {
  bg: "#0a0a0f",
  surface: "#12121a",
  surfaceHover: "#1a1a26",
  border: "#1e1e2e",
  borderAccent: "#2d2d44",
  text: "#e4e4ef",
  textMuted: "#8888a4",
  accent: "#6c63ff",
  accentGlow: "rgba(108,99,255,0.15)",
  accentSoft: "#4f46e5",
  green: "#10b981",
  greenGlow: "rgba(16,185,129,0.12)",
  amber: "#f59e0b",
  cyan: "#06b6d4",
};

// ─── Data ───
const skills = {
  "Бэкенд": [
    { name: "Node.js", level: 95 },
    { name: "NestJS", level: 95 },
    { name: "TypeScript", level: 92 },
    { name: "Express", level: 85 },
    { name: "GraphQL", level: 70 },
    { name: "REST API", level: 95 },
    { name: "WebSocket", level: 80 },
  ],
  "Фронтенд": [
    { name: "React", level: 80 },
    { name: "Next.js", level: 78 },
    { name: "Vue.js", level: 75 },
    { name: "HTML5/CSS3", level: 85 },
  ],
  "Базы данных": [
    { name: "PostgreSQL", level: 90 },
    { name: "MongoDB", level: 88 },
    { name: "MySQL", level: 85 },
    { name: "Redis", level: 88 },
  ],
  "Инфраструктура": [
    { name: "Docker", level: 88 },
    { name: "AWS", level: 80 },
    { name: "Kafka", level: 85 },
    { name: "CI/CD", level: 82 },
    { name: "Linux", level: 80 },
    { name: "Grafana", level: 75 },
    { name: "Prometheus", level: 75 },
  ],
};

const experience = [
  {
    company: 'ООО «Аксма»',
    role: "Backend-разработчик",
    period: "Сен 2025 — Настоящее время",
    duration: "6 мес",
    color: theme.accent,
    highlights: [
      "Спроектировал микросервисную систему предрейсовых медосмотров с веб-интерфейсом, аудитом сессий и отчётами качества",
      "Разработал событийный сервис уведомлений с настраиваемыми правилами, шаблонами и многоканальной доставкой (Telegram, логирование)",
    ],
    stack: ["NestJS", "TypeORM", "MySQL", "Docker"],
  },
  {
    company: "ННАДМ — Национальная академия доказательной медицины",
    role: "Ведущий backend-разработчик",
    period: "Ноя 2024 — Сен 2025",
    duration: "11 мес",
    color: theme.green,
    highlights: [
      "Спроектировал Git-подобную платформу версионирования данных для совместных медицинских исследований — ветвление, форки, откат без потери данных",
      "Разработал гранулярную RBAC-систему с анонимизацией данных, соответствующую требованиям безопасности и конфиденциальности",
      "Соавтор технического предложения, обеспечившего государственный грант и частные инвестиции",
    ],
    stack: ["NestJS", "MongoDB", "Redis", "Kafka"],
  },
  {
    company: "Digital Agency",
    role: "Fullstack-разработчик",
    period: "Июн 2023 — Ноя 2024",
    duration: "1 год 6 мес",
    color: theme.cyan,
    highlights: [
      "Создал платформу управления цифровыми активами — хранение файлов, контроль доступа, превью, CDN-доставка",
      "Полный цикл разработки от NestJS-бэкенда до Next.js (React) фронтенда",
    ],
    stack: ["NestJS", "Next.js", "PostgreSQL", "AWS S3", "Lambda", "CloudFront", "CDK"],
  },
  {
    company: "WorkBox",
    role: "Ведущий backend-разработчик",
    period: "Янв 2023 — Июн 2023",
    duration: "6 мес",
    color: theme.amber,
    highlights: [
      "Единственный backend-разработчик — построил масштабируемую микросервисную архитектуру с нуля",
      "Кэширование Redis сократило время ответа API на 30%",
      "Проект получил инвестиции и гранты от Ростелекома",
    ],
    stack: ["NestJS", "MongoDB", "Kafka", "Redis", "Docker"],
  },
  {
    company: 'ООО «МедСофт»',
    role: "Fullstack-разработчик",
    period: "Ноя 2021 — Дек 2022",
    duration: "1 год 2 мес",
    color: "#ef4444",
    highlights: [
      "Разработал ключевые модули системы отслеживания фармпрепаратов, обслуживающей медучреждения в 3 регионах",
      "1 000+ ежедневных операций — списание, откат, движение препаратов с полным аудитом",
      "Создал Vue.js-дашборды, панели мониторинга и динамические отчёты",
    ],
    stack: ["Node.js", "Vue.js", "PostgreSQL", "SQL"],
  },
];

const stats = [
  { label: "Лет опыта", value: "4+", icon: Briefcase },
  { label: "Коммерческих проектов", value: "5", icon: Layers },
  { label: "Микросервисов создано", value: "15+", icon: Server },
];

// ─── Components ───

function AnimatedBar({ level, color, delay }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setWidth(level), delay);
    return () => clearTimeout(timer);
  }, [level, delay]);
  return (
    <div style={{ height: 4, background: theme.border, borderRadius: 2, overflow: "hidden" }}>
      <div
        style={{
          height: "100%",
          width: `${width}%`,
          background: `linear-gradient(90deg, ${color}, ${theme.accent})`,
          borderRadius: 2,
          transition: "width 1s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
    </div>
  );
}

function GlowDot({ color }) {
  return (
    <span
      style={{
        display: "inline-block",
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: color,
        boxShadow: `0 0 8px ${color}`,
        flexShrink: 0,
      }}
    />
  );
}

function SectionTitle({ icon: Icon, children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: theme.accentGlow,
          border: `1px solid ${theme.borderAccent}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon size={18} color={theme.accent} />
      </div>
      <h2
        style={{
          fontSize: 22,
          fontWeight: 700,
          fontFamily: "'Outfit', sans-serif",
          color: theme.text,
          margin: 0,
          letterSpacing: "-0.02em",
        }}
      >
        {children}
      </h2>
      <div style={{ flex: 1, height: 1, background: theme.border, marginLeft: 12 }} />
    </div>
  );
}

// ─── Main ───

export default function ResumeLanding() {
  const [activeSkillTab, setActiveSkillTab] = useState("Бэкенд");
  const [hoveredExp, setHoveredExp] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = FONT_LINK;
    link.rel = "stylesheet";
    document.head.appendChild(link);
    setTimeout(() => setLoaded(true), 100);
  }, []);

  const skillIcons = {
    "Бэкенд": Server,
    "Фронтенд": Code2,
    "Базы данных": Database,
    "Инфраструктура": Cloud,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: theme.bg,
        color: theme.text,
        fontFamily: "'Outfit', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: `
            linear-gradient(${theme.border} 1px, transparent 1px),
            linear-gradient(90deg, ${theme.border} 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          opacity: 0.25,
          pointerEvents: "none",
        }}
      />

      {/* Glow orbs */}
      <div
        style={{
          position: "fixed",
          top: -200,
          right: -200,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.accentGlow} 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: -300,
          left: -200,
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.greenGlow} 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "40px 24px 80px",
          position: "relative",
          zIndex: 1,
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* ═══ HERO ═══ */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <GlowDot color={theme.green} />
            <span
              style={{
                fontSize: 13,
                fontFamily: "'JetBrains Mono', monospace",
                color: theme.green,
                letterSpacing: "0.05em",
              }}
            >
              ОТКРЫТ К ПРЕДЛОЖЕНИЯМ
            </span>
          </div>

          <h1
            style={{
              fontSize: "clamp(36px, 6vw, 56px)",
              fontWeight: 800,
              lineHeight: 1.05,
              margin: "0 0 8px",
              letterSpacing: "-0.03em",
              background: `linear-gradient(135deg, ${theme.text} 0%, ${theme.textMuted} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Рем Юрков
          </h1>

          <p
            style={{
              fontSize: "clamp(18px, 3vw, 24px)",
              fontWeight: 300,
              color: theme.textMuted,
              margin: "0 0 24px",
              letterSpacing: "-0.01em",
            }}
          >
            Node.js Backend-инженер{" "}
            <span style={{ color: theme.accent }}>·</span> Middle+
          </p>

          <p
            style={{
              fontSize: 15,
              lineHeight: 1.7,
              color: theme.textMuted,
              maxWidth: 620,
              margin: "0 0 28px",
            }}
          >
            4+ года опыта в создании высоконагруженных микросервисных систем на NestJS, TypeScript,
            Kafka и облачной инфраструктуре. Backend-first fullstack с опытом React/Next.js.
            Проектирую архитектуры, оптимизирую базы данных и выпускаю продукты,
            которые масштабируются.
          </p>

          {/* Contact pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {[
              { icon: MapPin, text: "Москва, Россия", href: null },
              { icon: Mail, text: "okoloculture@mail.ru", href: "mailto:okoloculture@mail.ru" },
              { icon: Send, text: "@ok0l0culture", href: "https://t.me/ok0l0culture" },
              { icon: Globe, text: "Английский B2", href: null },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href || "#"}
                target={item.href ? "_blank" : undefined}
                rel="noopener"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 14px",
                  borderRadius: 8,
                  background: theme.surface,
                  border: `1px solid ${theme.border}`,
                  color: theme.textMuted,
                  fontSize: 13,
                  fontFamily: "'JetBrains Mono', monospace",
                  textDecoration: "none",
                  transition: "all 0.2s",
                  cursor: item.href ? "pointer" : "default",
                }}
              >
                <item.icon size={14} />
                {item.text}
              </a>
            ))}
          </div>
        </div>

        {/* ═══ STATS ═══ */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 12,
            marginBottom: 64,
          }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              style={{
                padding: "20px 16px",
                borderRadius: 14,
                background: theme.surface,
                border: `1px solid ${theme.border}`,
                textAlign: "center",
              }}
            >
              <s.icon
                size={20}
                color={theme.accent}
                style={{ marginBottom: 8, opacity: 0.7 }}
              />
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: theme.text,
                  fontFamily: "'JetBrains Mono', monospace",
                  lineHeight: 1,
                  marginBottom: 4,
                }}
              >
                {s.value}
              </div>
              <div style={{ fontSize: 12, color: theme.textMuted, letterSpacing: "0.03em" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* ═══ SKILLS ═══ */}
        <div style={{ marginBottom: 64 }}>
          <SectionTitle icon={Zap}>Стек технологий</SectionTitle>

          {/* Tabs */}
          <div
            style={{
              display: "flex",
              gap: 4,
              padding: 4,
              background: theme.surface,
              borderRadius: 12,
              border: `1px solid ${theme.border}`,
              marginBottom: 24,
              width: "fit-content",
            }}
          >
            {Object.keys(skills).map((tab) => {
              const Icon = skillIcons[tab];
              const active = activeSkillTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveSkillTab(tab)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "8px 16px",
                    borderRadius: 8,
                    border: "none",
                    background: active ? theme.accentGlow : "transparent",
                    color: active ? theme.accent : theme.textMuted,
                    fontSize: 13,
                    fontWeight: 600,
                    fontFamily: "'Outfit', sans-serif",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  <Icon size={14} />
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Skill bars */}
          <div style={{ display: "grid", gap: 14 }}>
            {skills[activeSkillTab].map((skill, i) => (
              <div key={skill.name}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 6,
                  }}
                >
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: theme.text,
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {skill.name}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      color: theme.textMuted,
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {skill.level}%
                  </span>
                </div>
                <AnimatedBar level={skill.level} color={theme.green} delay={i * 80} />
              </div>
            ))}
          </div>
        </div>

        {/* ═══ EXPERIENCE ═══ */}
        <div style={{ marginBottom: 64 }}>
          <SectionTitle icon={Briefcase}>Опыт работы</SectionTitle>

          <div style={{ display: "grid", gap: 16 }}>
            {experience.map((exp, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredExp(i)}
                onMouseLeave={() => setHoveredExp(null)}
                style={{
                  padding: 24,
                  borderRadius: 16,
                  background: hoveredExp === i ? theme.surfaceHover : theme.surface,
                  border: `1px solid ${hoveredExp === i ? exp.color + "44" : theme.border}`,
                  transition: "all 0.3s ease",
                  cursor: "default",
                }}
              >
                {/* Header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: 8,
                    marginBottom: 8,
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                      <GlowDot color={exp.color} />
                      <span style={{ fontSize: 17, fontWeight: 700, color: theme.text }}>
                        {exp.company}
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: 14,
                        color: exp.color,
                        fontWeight: 600,
                        paddingLeft: 18,
                      }}
                    >
                      {exp.role}
                    </span>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        fontSize: 13,
                        color: theme.textMuted,
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      {exp.period}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: theme.textMuted,
                        fontFamily: "'JetBrains Mono', monospace",
                        opacity: 0.6,
                      }}
                    >
                      {exp.duration}
                    </div>
                  </div>
                </div>

                {/* Highlights */}
                <div style={{ paddingLeft: 18, marginTop: 12 }}>
                  {exp.highlights.map((h, j) => (
                    <div
                      key={j}
                      style={{
                        display: "flex",
                        gap: 8,
                        marginBottom: 8,
                        alignItems: "flex-start",
                      }}
                    >
                      <ChevronRight
                        size={14}
                        color={exp.color}
                        style={{ marginTop: 3, flexShrink: 0, opacity: 0.7 }}
                      />
                      <span style={{ fontSize: 14, color: theme.textMuted, lineHeight: 1.6 }}>
                        {h}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Stack */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 6,
                    paddingLeft: 18,
                    marginTop: 12,
                  }}
                >
                  {exp.stack.map((t) => (
                    <Badge
                      key={t}
                      variant="outline"
                      className="text-xs"
                      style={{
                        borderColor: theme.borderAccent,
                        color: theme.textMuted,
                        background: "transparent",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 11,
                        padding: "2px 8px",
                      }}
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ EDUCATION ═══ */}
        <div style={{ marginBottom: 64 }}>
          <SectionTitle icon={GraduationCap}>Образование</SectionTitle>
          <div style={{ display: "grid", gap: 12 }}>
            {[
              {
                school: "Московский государственный университет технологий и управления",
                degree: "Бакалавриат, Прикладная информатика",
                year: "2026",
              },
              {
                school: "Школа 21 (методология Ecole 42)",
                degree: "Повышение квалификации, Программная инженерия",
                year: "2025",
              },
            ].map((edu, i) => (
              <div
                key={i}
                style={{
                  padding: "16px 20px",
                  borderRadius: 12,
                  background: theme.surface,
                  border: `1px solid ${theme.border}`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 8,
                  }}
                >
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: theme.text }}>
                      {edu.school}
                    </div>
                    <div style={{ fontSize: 13, color: theme.textMuted, marginTop: 2 }}>
                      {edu.degree}
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: 13,
                      fontFamily: "'JetBrains Mono', monospace",
                      color: theme.accent,
                      fontWeight: 600,
                    }}
                  >
                    {edu.year}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ LANGUAGES ═══ */}
        <div style={{ marginBottom: 64 }}>
          <SectionTitle icon={MessageSquare}>Языки</SectionTitle>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[
              { lang: "Русский", level: "Родной", pct: 100 },
              { lang: "Английский", level: "B2 — Выше среднего", pct: 72 },
              { lang: "Французский", level: "B1 — Средний", pct: 55 },
            ].map((l) => (
              <div
                key={l.lang}
                style={{
                  flex: "1 1 200px",
                  padding: "16px 20px",
                  borderRadius: 12,
                  background: theme.surface,
                  border: `1px solid ${theme.border}`,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: theme.text }}>{l.lang}</span>
                  <span style={{ fontSize: 12, color: theme.textMuted }}>{l.level}</span>
                </div>
                <AnimatedBar level={l.pct} color={theme.cyan} delay={200} />
              </div>
            ))}
          </div>
        </div>

        {/* ═══ FOOTER ═══ */}
        <div
          style={{
            textAlign: "center",
            padding: "32px 0",
            borderTop: `1px solid ${theme.border}`,
          }}
        >
          <p
            style={{
              fontSize: 13,
              fontFamily: "'JetBrains Mono', monospace",
              color: theme.textMuted,
              opacity: 0.5,
            }}
          >
            © 2026 Рем Юрков — Создано на React & shadcn/ui
          </p>
        </div>
      </div>
    </div>
  );
}
