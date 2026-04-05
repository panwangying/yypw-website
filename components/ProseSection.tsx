const lines = [
    { id: 1, text: ["我总是慢半拍，", "但我知道我在去哪里。"] },
    { id: 2, text: ["我习惯坐在角落，", "看人群如何流动，", "看光如何消失。"] },
    { id: 3, text: ["有些话说了很多遍，", "最后都还给了风。"] },
    { id: 4, text: ["便利店的灯永远亮着，", "像是在等一个不会来的人。"] },
    { id: 5, text: ["还好，一切都还好。"] },
    { id: 6, text: ["二十几岁，", "什么都想要，", "又什么都不确定。"] },
  ];
  
  export default function ProseSection() {
    return (
      <section className="px-6 md:px-12 pb-24 md:pb-32">
        <div className="max-w-xl space-y-16 md:space-y-24">
          {lines.map((item, i) => (
            <div key={item.id}>
              <span className="block text-[11px] tracking-[0.18em] uppercase text-[#C8C7C2] mb-3 md:mb-4 font-light">
                0{item.id}
              </span>
              <div className="space-y-1">
                {item.text.map((line, j) => (
                  <p
                    key={j}
                    className="text-[clamp(20px,3.5vw,36px)] font-light leading-[1.5] tracking-[-0.01em] text-[#111110]"
                    style={{ fontFamily: "'Noto Serif SC', serif" }}
                  >
                    {line}
                  </p>
                ))}
              </div>
              {i < lines.length - 1 && (
                <div className="mt-16 md:mt-24 w-8 h-[1px] bg-[#E4E3DF]" />
              )}
            </div>
          ))}
        </div>
      </section>
    );
  }