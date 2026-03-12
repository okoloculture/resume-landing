import { useState, useEffect, useRef, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Code2,
  Database,
  Server,
  Cloud,
  Mail,
  MapPin,
  Globe,
  ChevronRight,
  Zap,
  Layers,
  Send,
  Briefcase,
  GraduationCap,
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

// ─── Hooks ───

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function useMouseParallax(intensity = 0.02) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handle = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setOffset({ x: (e.clientX - cx) * intensity, y: (e.clientY - cy) * intensity });
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [intensity]);
  return offset;
}

// ─── Components ───

function FloatingParticles() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.4 + 0.1,
    }));
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(108,99,255,${p.opacity})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}
    />
  );
}

function TypingText({ text, speed = 60, delay = 500 }) {
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(interval); setTimeout(() => setShowCursor(false), 1500); }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay]);
  return (
    <span>
      {displayed}
      {showCursor && (
        <span
          style={{
            display: "inline-block",
            width: 3,
            height: "0.9em",
            background: theme.accent,
            marginLeft: 2,
            verticalAlign: "middle",
            animation: "blink 0.8s step-end infinite",
          }}
        />
      )}
    </span>
  );
}

function AnimatedCounter({ value, duration = 1500 }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!started) return;
    const numericPart = parseInt(value.replace(/\D/g, ""), 10);
    const suffix = value.replace(/\d/g, "");
    if (isNaN(numericPart)) { setDisplay(value); return; }
    const start = performance.now();
    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(numericPart * eased) + suffix);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [started, value, duration]);
  return <span ref={ref}>{display}</span>;
}

function AnimatedBar({ level, color, delay }) {
  const [width, setWidth] = useState(0);
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setWidth(level), delay);
    return () => clearTimeout(timer);
  }, [level, delay]);
  return (
    <div
      style={{ height: 6, background: theme.border, borderRadius: 3, overflow: "hidden", position: "relative" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          height: "100%",
          width: `${width}%`,
          background: `linear-gradient(90deg, ${color}, ${theme.accent})`,
          borderRadius: 3,
          transition: "width 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          boxShadow: hovered ? `0 0 12px ${color}66` : "none",
          position: "relative",
        }}
      >
        {hovered && (
          <div
            style={{
              position: "absolute",
              right: 0,
              top: -28,
              background: theme.surface,
              border: `1px solid ${theme.borderAccent}`,
              borderRadius: 6,
              padding: "2px 8px",
              fontSize: 11,
              fontFamily: "'JetBrains Mono', monospace",
              color: theme.text,
              whiteSpace: "nowrap",
              animation: "fadeInUp 0.2s ease",
            }}
          >
            {level}%
          </div>
        )}
      </div>
    </div>
  );
}

function GlowDot({ color, pulse }) {
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
        animation: pulse ? "pulse 2s ease-in-out infinite" : "none",
      }}
    />
  );
}

function FadeInSection({ children, delay = 0, direction = "up" }) {
  const [ref, visible] = useInView(0.1);
  const transforms = {
    up: "translateY(40px)",
    down: "translateY(-40px)",
    left: "translateX(-40px)",
    right: "translateX(40px)",
  };
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(0)" : transforms[direction],
        transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
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
          transition: "transform 0.3s, box-shadow 0.3s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "rotate(10deg) scale(1.1)";
          e.currentTarget.style.boxShadow = `0 0 20px ${theme.accentGlow}`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "rotate(0) scale(1)";
          e.currentTarget.style.boxShadow = "none";
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
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${theme.border}, transparent)`, marginLeft: 12 }} />
    </div>
  );
}

// ─── CSS Keyframes ───
const globalStyles = `
  @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
  @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.6; transform: scale(1.3); } }
  @keyframes fadeInUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
  @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
  * { scrollbar-width: thin; scrollbar-color: ${theme.borderAccent} ${theme.bg}; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: ${theme.bg}; }
  ::-webkit-scrollbar-thumb { background: ${theme.borderAccent}; border-radius: 3px; }
  ::selection { background: ${theme.accentGlow}; color: ${theme.text}; }
`;

// ─── Main ───

export default function ResumeLanding() {
  const [activeSkillTab, setActiveSkillTab] = useState("Бэкенд");
  const [hoveredExp, setHoveredExp] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [hoveredStat, setHoveredStat] = useState(null);
  const [hoveredContact, setHoveredContact] = useState(null);
  const [hoveredEdu, setHoveredEdu] = useState(null);
  const [hoveredLang, setHoveredLang] = useState(null);
  const parallax = useMouseParallax(0.015);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = FONT_LINK;
    link.rel = "stylesheet";
    document.head.appendChild(link);
    const style = document.createElement("style");
    style.textContent = globalStyles;
    document.head.appendChild(style);
    setTimeout(() => setLoaded(true), 100);
    return () => { document.head.removeChild(style); };
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
      <FloatingParticles />

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

      {/* Glow orbs with parallax */}
      <div
        style={{
          position: "fixed",
          top: -200 + parallax.y * 2,
          right: -200 + parallax.x * -2,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.accentGlow} 0%, transparent 70%)`,
          pointerEvents: "none",
          transition: "top 0.3s ease-out, right 0.3s ease-out",
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: -300 + parallax.y * -2,
          left: -200 + parallax.x * 2,
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.greenGlow} 0%, transparent 70%)`,
          pointerEvents: "none",
          transition: "bottom 0.3s ease-out, left 0.3s ease-out",
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
          transform: loaded ? "translateY(0)" : "translateY(30px)",
          transition: "all 1s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* ═══ HERO ═══ */}
        <FadeInSection>
          <div style={{ marginBottom: 64 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <GlowDot color={theme.green} pulse />
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
              <TypingText text="Рэм Юрков" speed={80} delay={300} />
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
                  onMouseEnter={() => setHoveredContact(i)}
                  onMouseLeave={() => setHoveredContact(null)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "6px 14px",
                    borderRadius: 8,
                    background: hoveredContact === i ? theme.surfaceHover : theme.surface,
                    border: `1px solid ${hoveredContact === i ? theme.accent + "44" : theme.border}`,
                    color: hoveredContact === i ? theme.text : theme.textMuted,
                    fontSize: 13,
                    fontFamily: "'JetBrains Mono', monospace",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                    cursor: item.href ? "pointer" : "default",
                    transform: hoveredContact === i ? "translateY(-2px)" : "translateY(0)",
                    boxShadow: hoveredContact === i ? `0 4px 15px ${theme.accent}15` : "none",
                  }}
                >
                  <item.icon size={14} style={{ transition: "transform 0.3s", transform: hoveredContact === i ? "scale(1.2)" : "scale(1)" }} />
                  {item.text}
                </a>
              ))}
            </div>
          </div>
        </FadeInSection>

        {/* ═══ STATS ═══ */}
        <FadeInSection delay={100}>
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
                onMouseEnter={() => setHoveredStat(i)}
                onMouseLeave={() => setHoveredStat(null)}
                style={{
                  padding: "20px 16px",
                  borderRadius: 14,
                  background: hoveredStat === i ? theme.surfaceHover : theme.surface,
                  border: `1px solid ${hoveredStat === i ? theme.accent + "44" : theme.border}`,
                  textAlign: "center",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  transform: hoveredStat === i ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
                  boxShadow: hoveredStat === i ? `0 12px 30px ${theme.accent}15` : "none",
                  cursor: "default",
                }}
              >
                <s.icon
                  size={20}
                  color={theme.accent}
                  style={{
                    marginBottom: 8,
                    opacity: hoveredStat === i ? 1 : 0.7,
                    transition: "all 0.3s",
                    animation: hoveredStat === i ? "float 2s ease-in-out infinite" : "none",
                  }}
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
                  <AnimatedCounter value={s.value} />
                </div>
                <div style={{ fontSize: 12, color: theme.textMuted, letterSpacing: "0.03em" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </FadeInSection>

        {/* ═══ SKILLS ═══ */}
        <FadeInSection delay={150}>
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
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      transform: active ? "scale(1.05)" : "scale(1)",
                      boxShadow: active ? `0 0 15px ${theme.accent}20` : "none",
                    }}
                  >
                    <Icon size={14} style={{ transition: "transform 0.3s", transform: active ? "rotate(10deg)" : "rotate(0)" }} />
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* Skill bars */}
            <div style={{ display: "grid", gap: 14 }}>
              {skills[activeSkillTab].map((skill, i) => (
                <div
                  key={`${activeSkillTab}-${skill.name}`}
                  style={{
                    opacity: 0,
                    animation: `fadeInUp 0.4s ease ${i * 60}ms forwards`,
                  }}
                >
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
                  <AnimatedBar level={skill.level} color={theme.green} delay={i * 80 + 200} />
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>

        {/* ═══ EXPERIENCE ═══ */}
        <FadeInSection delay={100}>
          <div style={{ marginBottom: 64 }}>
            <SectionTitle icon={Briefcase}>Опыт работы</SectionTitle>

            <div style={{ display: "grid", gap: 16 }}>
              {experience.map((exp, i) => (
                <FadeInSection key={i} delay={i * 100} direction="left">
                  <div
                    onMouseEnter={() => setHoveredExp(i)}
                    onMouseLeave={() => setHoveredExp(null)}
                    style={{
                      padding: 24,
                      borderRadius: 16,
                      background: hoveredExp === i ? theme.surfaceHover : theme.surface,
                      border: `1px solid ${hoveredExp === i ? exp.color + "55" : theme.border}`,
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      cursor: "default",
                      transform: hoveredExp === i ? "translateX(8px)" : "translateX(0)",
                      boxShadow: hoveredExp === i ? `0 8px 30px ${exp.color}15, inset 0 0 0 1px ${exp.color}15` : "none",
                      borderLeft: hoveredExp === i ? `3px solid ${exp.color}` : `3px solid transparent`,
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
                            style={{
                              marginTop: 3,
                              flexShrink: 0,
                              opacity: 0.7,
                              transition: "transform 0.3s",
                              transform: hoveredExp === i ? "translateX(3px)" : "translateX(0)",
                            }}
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
                      {exp.stack.map((t, ti) => (
                        <Badge
                          key={t}
                          variant="outline"
                          className="text-xs"
                          style={{
                            borderColor: hoveredExp === i ? exp.color + "44" : theme.borderAccent,
                            color: hoveredExp === i ? theme.text : theme.textMuted,
                            background: hoveredExp === i ? exp.color + "10" : "transparent",
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: 11,
                            padding: "2px 8px",
                            transition: `all 0.3s ease ${ti * 30}ms`,
                            transform: hoveredExp === i ? "scale(1.05)" : "scale(1)",
                          }}
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </FadeInSection>

        {/* ═══ EDUCATION ═══ */}
        <FadeInSection delay={100}>
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
                  onMouseEnter={() => setHoveredEdu(i)}
                  onMouseLeave={() => setHoveredEdu(null)}
                  style={{
                    padding: "16px 20px",
                    borderRadius: 12,
                    background: hoveredEdu === i ? theme.surfaceHover : theme.surface,
                    border: `1px solid ${hoveredEdu === i ? theme.accent + "44" : theme.border}`,
                    transition: "all 0.3s ease",
                    transform: hoveredEdu === i ? "translateY(-3px)" : "translateY(0)",
                    boxShadow: hoveredEdu === i ? `0 8px 25px ${theme.accent}10` : "none",
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
                        transition: "transform 0.3s",
                        transform: hoveredEdu === i ? "scale(1.15)" : "scale(1)",
                      }}
                    >
                      {edu.year}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>

        {/* ═══ LANGUAGES ═══ */}
        <FadeInSection delay={100}>
          <div style={{ marginBottom: 64 }}>
            <SectionTitle icon={MessageSquare}>Языки</SectionTitle>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {[
                { lang: "Русский", level: "Родной", pct: 100 },
                { lang: "Английский", level: "B2 — Выше среднего", pct: 72 },
                { lang: "Французский", level: "B1 — Средний", pct: 55 },
              ].map((l, i) => (
                <div
                  key={l.lang}
                  onMouseEnter={() => setHoveredLang(i)}
                  onMouseLeave={() => setHoveredLang(null)}
                  style={{
                    flex: "1 1 200px",
                    padding: "16px 20px",
                    borderRadius: 12,
                    background: hoveredLang === i ? theme.surfaceHover : theme.surface,
                    border: `1px solid ${hoveredLang === i ? theme.cyan + "44" : theme.border}`,
                    transition: "all 0.3s ease",
                    transform: hoveredLang === i ? "translateY(-3px)" : "translateY(0)",
                    boxShadow: hoveredLang === i ? `0 8px 25px ${theme.cyan}10` : "none",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: theme.text }}>{l.lang}</span>
                    <span style={{ fontSize: 12, color: theme.textMuted }}>{l.level}</span>
                  </div>
                  <AnimatedBar level={l.pct} color={theme.cyan} delay={200 + i * 150} />
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>

        {/* ═══ FOOTER ═══ */}
        <FadeInSection>
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
              © 2026 Рэм Юрков — Создано на React & shadcn/ui
            </p>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}
