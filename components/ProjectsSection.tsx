const projects = [
  {
    id: "01",
    title: "Ski Utah",
    subtitle: "粉雪探寻网站",
    desc: "交互式网页，结合实时天气数据帮助滑雪者规划犹他州粉雪日行程。集成 Open-Meteo API、Leaflet 地图与响应式卡片组件。",
    tags: ["JavaScript", "HTML/CSS", "Leaflet", "API"],
    year: "2025",
  },
  {
    id: "02",
    title: "Unity 2D 叙事游戏",
    subtitle: "团队项目",
    desc: "使用 C# 实现对话系统与分支故事逻辑，设计 UI 组件确保交互清晰流畅，运用面向对象编程管理游戏状态。",
    tags: ["C#", "Unity", "UI Design", "OOP"],
    year: "2025",
  },
];

export default function ProjectsSection() {
  return (
    <section className="px-6 md:px-12 py-24">

      <span className="block text-[11px] tracking-[0.18em] uppercase text-[#8A8984] mb-12 font-light">
        Projects
      </span>

      <div className="flex flex-col">
        {projects.map((p) => (
          <div
            key={p.id}
            className="group flex flex-col md:flex-row md:items-start gap-4 md:gap-12 py-10 border-t border-[#E4E3DF] first:border-t-0 cursor-pointer"
          >
            {/* 序号 + 年份 */}
            <div className="flex md:flex-col gap-4 md:gap-1 md:w-16 flex-shrink-0">
              <span className="text-[11px] tracking-widest text-[#8A8984]">{p.id}</span>
              <span className="text-[11px] tracking-widest text-[#8A8984]">{p.year}</span>
            </div>

            {/* 主内容 */}
            <div className="flex-1">
              <div className="flex items-baseline gap-3 mb-3">
                <h3 className="text-[clamp(18px,2.5vw,24px)] font-light tracking-[-0.02em] text-[#111110] group-hover:text-[#2E5CFF] transition-colors duration-200">
                  {p.title}
                </h3>
                <span className="text-[12px] text-[#8A8984]">{p.subtitle}</span>
              </div>
              <p
                className="text-[15px] font-light leading-[1.8] text-[#1a1a18] mb-5 max-w-lg"
                style={{ fontFamily: "'Noto Serif SC', serif" }}
              >
                {p.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] tracking-wide text-[#5A5955] border border-[#D4D3CF] px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 箭头 */}
            <div className="hidden md:flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[#2E5CFF] text-[18px] mt-1">
              →
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}