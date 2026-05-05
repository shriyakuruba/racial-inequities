function _1(md){return(
md`# Built for Someone Else
### Her income does not save her. Her state does not save her. Her doctor does not save her.

Use the controls below each chart to investigate.

*Data: CDC Wonder 2018–2024 · Commonwealth Fund 2023 · MIT Election Lab · U.S. Census ACS 2023*`
)}

function _d3(require){return(
require("d3@7")
)}

async function _sketch1(FileAttachment)
{
  const raw = await FileAttachment("sketch1_mortality_income.csv").csv({typed: true})
  return raw
}


async function _sketch2(FileAttachment)
{
  const raw = await FileAttachment("sketch2_state_black_mortality@1.csv").csv({typed: true})
  return raw  // show everything, no filtering
}


function _prenatal(FileAttachment){return(
FileAttachment("prenatal_by_race_education.csv").csv({typed: true})
)}

function _COLORS(){return(
{
  Black: "#D85A30",
  White: "#3A7FBF",
  Hispanic: "#1D9E75",
  "Native American": "#EF9F27",
  Asian: "#888780",
  Democrat: "#4477CC",
  Republican: "#CC3333"
}
)}

function _7(md){return(
md`A Black woman earning six figures is still more likely to die in childbirth than a white woman living in poverty. Highlight a group below and look at where it sits on the chart.`
)}

function _panel1Controls(html)
{
  const container = html`<div style="
    display: flex;
    gap: 32px;
    align-items: flex-start;
    padding: 16px 20px;
    background: #fdf4f0;
    border-radius: 8px;
    margin: 12px 0;
    font-family: system-ui, sans-serif;
    border: 1px solid #f0d6cc;
  ">
    <div>
      <div style="font-size:11px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px">Highlight race</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap" id="race-buttons"></div>
    </div>
    <div>
      <div style="font-size:11px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px">Median markers</div>
      <label style="display:flex;align-items:center;gap:10px;cursor:pointer">
        <div style="position:relative;width:42px;height:24px;overflow:hidden;border-radius:24px;clip-path:inset(0)">
          <input type="checkbox" id="median-toggle" checked style="opacity:0;width:0;height:0;position:absolute">
          <div id="toggle-track" style="
            position:absolute;top:0;left:0;right:0;bottom:0;
            background:#D85A30;border-radius:24px;
            transition:background 0.2s;cursor:pointer;
          "></div>
          <div id="toggle-thumb" style="
            position:absolute;top:3px;left:21px;
            width:18px;height:18px;
            background:white;border-radius:50%;
            transition:left 0.2s;
            box-shadow:0 1px 3px rgba(0,0,0,0.2);
          "></div>
        </div>
        <span style="font-size:12px;color:#555">Show medians</span>
      </label>
    </div>
  </div>`

  const races = ["All", "Black", "White", "Native American", "Asian"]
  const raceColors = {
    "All": "#555",
    "Black": "#D85A30",
    "White": "#3A7FBF",
    "Native American": "#EF9F27",
    "Asian": "#888780"
  }

  let state = { highlightRace: "All", showMedians: true }

  const btnContainer = container.querySelector("#race-buttons")
  races.forEach(race => {
    const btn = document.createElement("button")
    btn.textContent = race
    btn.style.cssText = `
      padding: 5px 14px;
      border-radius: 20px;
      border: 1.5px solid ${raceColors[race]};
      background: ${race === "All" ? raceColors[race] : "white"};
      color: ${race === "All" ? "white" : raceColors[race]};
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s;
    `
    btn.addEventListener("click", () => {
      state.highlightRace = race
      btnContainer.querySelectorAll("button").forEach(b => {
        const r = b.textContent
        b.style.background = r === race ? raceColors[r] : "white"
        b.style.color = r === race ? "white" : raceColors[r]
      })
      container.dispatchEvent(new CustomEvent("input", {bubbles: true}))
    })
    btnContainer.appendChild(btn)
  })

  // Toggle logic
  const checkbox = container.querySelector("#median-toggle")
  const track = container.querySelector("#toggle-track")
  const thumb = container.querySelector("#toggle-thumb")

  checkbox.addEventListener("change", () => {
    state.showMedians = checkbox.checked
    track.style.background = checkbox.checked ? "#D85A30" : "#ccc"
    thumb.style.left = checkbox.checked ? "21px" : "3px"
    container.dispatchEvent(new CustomEvent("input", {bubbles: true}))
  })

  container.value = state
  container.addEventListener("input", () => { container.value = state })
  return container
}


function _9(d3)
{
  const stats = [
    { label: "Black maternal mortality rate", value: "40.2", unit: "per 100k", color: "#D85A30" },
    { label: "White maternal mortality rate", value: "15.4", unit: "per 100k", color: "#3A7FBF" },
    { label: "The gap", value: "2.6×", unit: "higher for Black women", color: "#D85A30" },
    { label: "Preventable deaths", value: "70%", unit: "hemorrhage or hypertension", color: "#888" }
  ]

  const div = d3.create("div")
    .style("display", "grid")
    .style("grid-template-columns", "repeat(4, 1fr)")
    .style("gap", "16px")
    .style("margin", "24px 0")
    .style("font-family", "system-ui, sans-serif")

  stats.forEach(s => {
    const card = div.append("div")
      .style("background", "#fafafa")
      .style("border-left", "4px solid " + s.color)
      .style("padding", "14px 16px")
      .style("border-radius", "4px")

    card.append("div")
      .style("font-size", "28px")
      .style("font-weight", "700")
      .style("color", s.color)
      .style("line-height", "1")
      .text(s.value)

    card.append("div")
      .style("font-size", "11px")
      .style("color", "#888")
      .style("margin-top", "4px")
      .text(s.unit)

    card.append("div")
      .style("font-size", "12px")
      .style("color", "#333")
      .style("margin-top", "6px")
      .style("font-weight", "500")
      .text(s.label)
  })

  return div.node()
}


function _10(panel1Controls,d3,sketch1,COLORS,invalidation)
{
  const _ = panel1Controls  // tells Observable to re-run when controls change
  const W = 700, H = 420
  const m = {top: 48, right: 160, bottom: 64, left: 72}
  const iW = W - m.left - m.right
  const iH = H - m.top - m.bottom


  const svg = d3.create("svg")
    .attr("width", W).attr("height", H)
    .style("font-family", "system-ui, sans-serif")
    .style("overflow", "visible")

  const g = svg.append("g").attr("transform", `translate(${m.left},${m.top})`)

  const xScale = d3.scaleLinear()
    .domain([40000, 120000]).range([0, iW])

  const yScale = d3.scaleLinear()
    .domain([0, 48]).range([iH, 0])

  // Gridlines
  g.append("g").attr("class","grid")
    .call(d3.axisLeft(yScale).ticks(6).tickSize(-iW).tickFormat(""))
    .call(ax => { ax.select(".domain").remove()
      ax.selectAll("line").style("stroke","#f0f0f0").style("stroke-width","1") })

  // Axes
  g.append("g").attr("transform",`translate(0,${iH})`)
    .call(d3.axisBottom(xScale)
      .tickFormat(d => `$${d3.format(",")(d/1000)}k`).ticks(6))
    .call(ax => { ax.select(".domain").attr("stroke","#ccc")
      ax.selectAll("text").style("font-size","11px") })

  g.append("g")
    .call(d3.axisLeft(yScale).ticks(6))
    .call(ax => { ax.select(".domain").attr("stroke","#ccc")
      ax.selectAll("text").style("font-size","11px") })

  // Axis labels
  svg.append("text")
    .attr("x", m.left + iW/2).attr("y", H - 8)
    .attr("text-anchor","middle")
    .style("font-size","12px").style("fill","#555")
    .text("Median Household Income (2023, USD)")

  svg.append("text")
    .attr("transform","rotate(-90)")
    .attr("x", -(m.top + iH/2)).attr("y", 16)
    .attr("text-anchor","middle")
    .style("font-size","12px").style("fill","#555")
    .text("Maternal Mortality Rate per 100k Live Births")

  // Chart title
  svg.append("text")
    .attr("x", m.left).attr("y", 22)
    .style("font-size","13px").style("font-weight","600")
    .style("fill", "#D85A30")
    .text("Black women die at 2.6× the white rate — at every income level")

  // Median income vertical lines (conditional)
  // Median income vertical lines (conditional)
  if (panel1Controls.showMedians) {
    sketch1.forEach(d => {
      const isHL = panel1Controls.highlightRace === "All" || panel1Controls.highlightRace === d.race
      const isShortLine = d.mortality_rate_per_100k < 10

      g.append("line")
        .attr("x1", xScale(d.median_income_2023))
        .attr("x2", xScale(d.median_income_2023))
        .attr("y1", iH)
        .attr("y2", yScale(d.mortality_rate_per_100k) + 16)
        .attr("stroke", COLORS[d.race] || "#aaa")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray","4 3")
        .attr("opacity", isHL ? 0.6 : 0)
        .style("pointer-events", isHL ? "all" : "none")
      if (isShortLine) {
        g.append("text")
          .attr("x", xScale(d.median_income_2023) + 4)
          .attr("y", iH - 8)
          .attr("text-anchor","start")
          .style("font-size","9px")
          .style("fill", COLORS[d.race] || "#aaa")
          .style("opacity", isHL ? 0.8 : 0)
          .text("median")
      } else {
        g.append("text")
          .attr("transform", `translate(${xScale(d.median_income_2023) - 10}, ${iH - 20}) rotate(-90)`)
          .attr("text-anchor","start")
          .style("font-size","9px")
          .style("fill", COLORS[d.race] || "#aaa")
          .style("opacity", isHL ? 0.8 : 0)
          .text("median")
      }
    })
  }

  // Dots
  // Tooltip div
  const tip = d3.select("body").append("div")
    .style("position","absolute")
    .style("background","rgba(0,0,0,0.82)")
    .style("color","#fff")
    .style("padding","10px 14px")
    .style("border-radius","6px")
    .style("font-size","12px")
    .style("pointer-events","none")
    .style("opacity",0)
    .style("line-height","1.7")
    .style("max-width","220px")

  // Dots
  sketch1.forEach(d => {
    const isHL = panel1Controls.highlightRace === "All" || panel1Controls.highlightRace === d.race
    const isBlack = d.race === "Black"

    g.append("circle")
      .attr("cx", xScale(d.median_income_2023))
      .attr("cy", yScale(d.mortality_rate_per_100k))
      .attr("r", isBlack ? 13 : 10)
      .attr("fill", COLORS[d.race] || "#aaa")
      .attr("opacity", isHL ? 0.9 : 0)
      .style("pointer-events", isHL ? "all" : "none")
      .attr("stroke", isBlack ? "#fff" : "none")
      .attr("stroke-width", 2)
      .style("cursor","pointer")
      .on("mouseover", function(event) {
        d3.select(this)
          .attr("r", isBlack ? 17 : 13)
          .attr("opacity", 1)
          .attr("stroke","#fff")
          .attr("stroke-width", 2.5)

        const whiteRate = sketch1.find(r => r.race === "White")?.mortality_rate_per_100k
        const ratio = whiteRate ? (d.mortality_rate_per_100k / whiteRate).toFixed(1) : null
        const ratioText = ratio && d.race !== "White"
          ? `<br><span style="color:#f9a87a">${ratio}× the white rate</span>`
          : ""

        tip.style("opacity", 1)
          .html(`
            <strong style="font-size:13px">${d.race}</strong><br>
            Mortality rate: <strong>${d.mortality_rate_per_100k}</strong> per 100k<br>
            Median income: <strong>$${d3.format(",")(d.median_income_2023)}</strong>
            ${ratioText}
          `)
      })
      .on("mousemove", function(event) {
        tip.style("left", (event.pageX + 16) + "px")
           .style("top", (event.pageY - 32) + "px")
      })
      .on("mouseout", function() {
        d3.select(this)
          .attr("r", isBlack ? 13 : 10)
          .attr("opacity", isHL ? 0.9 : 0)
          .attr("stroke", isBlack ? "#fff" : "none")
          .attr("stroke-width", 2)
        tip.style("opacity", 0)
      })

    // Race + rate label
    g.append("text")
      .attr("x", xScale(d.median_income_2023) + (isBlack ? 16 : 13))
      .attr("y", yScale(d.mortality_rate_per_100k) + 4)
      .style("font-size", isBlack ? "12px" : "11px")
      .style("font-weight", isBlack ? "700" : "400")
      .style("fill", COLORS[d.race] || "#aaa")
      .style("opacity", isHL ? 1 : 0)
      .text(`${d.race}  ${d.mortality_rate_per_100k}`)
  })

  invalidation.then(() => tip.remove())

  // Gap bracket annotation between Black and White
  const black = sketch1.find(d => d.race === "Black")
  const white = sketch1.find(d => d.race === "White")
  if (black && white) {
    const bx = xScale(black.median_income_2023) - 36
    const by = yScale(black.mortality_rate_per_100k)
    const wy = yScale(white.mortality_rate_per_100k)
    const bracketOpacity = (panel1Controls.highlightRace === "All" ? 0.8 : 0)

    g.append("line").attr("x1",bx).attr("x2",bx).attr("y1",by).attr("y2",wy)
      .attr("stroke","#D85A30").attr("stroke-width",1.5).attr("opacity",bracketOpacity)

    g.append("line").attr("x1",bx-4).attr("x2",bx+4).attr("y1",by).attr("y2",by)
      .attr("stroke","#D85A30").attr("stroke-width",1.5).attr("opacity",bracketOpacity)

    g.append("line").attr("x1",bx-4).attr("x2",bx+4).attr("y1",wy).attr("y2",wy)
      .attr("stroke","#D85A30").attr("stroke-width",1.5).attr("opacity",bracketOpacity)

    g.append("text")
      .attr("x", bx - 8).attr("y", (by + wy)/2 + 4)
      .attr("text-anchor","middle")
      .attr("transform", `rotate(-90, ${bx - 8}, ${(by+wy)/2+4})`)
      .style("font-size","10px").style("fill","#D85A30")
      .style("opacity", bracketOpacity)
      .text("2.6× gap")
  }

  // Key insight callout box
  const insightX = iW - 10
  const insightY = 10
  g.append("rect")
    .attr("x", insightX - 152).attr("y", insightY)
    .attr("width", 160).attr("height", 54)
    .attr("rx", 5).attr("fill","#fff3f0")
    .attr("stroke","#D85A30").attr("stroke-width","0.8")

  g.append("text")
    .attr("x", insightX - 72).attr("y", insightY + 16)
    .attr("text-anchor","middle")
    .style("font-size","10px").style("fill","#D85A30").style("font-weight","600")
    .text("A Black woman at $120k income")

  g.append("text")
    .attr("x", insightX - 72).attr("y", insightY + 30)
    .attr("text-anchor","middle")
    .style("font-size","10px").style("fill","#D85A30")
    .text("still dies at higher rates than")

  g.append("text")
    .attr("x", insightX - 72).attr("y", insightY + 44)
    .attr("text-anchor","middle")
    .style("font-size","10px").style("fill","#D85A30")
    .text("a white woman at $40k.")

  return svg.node()
}


function _11(htl){return(
htl.html`<div style="display:flex;gap:12px;align-items:center;margin:32px 0 8px;font-family:system-ui">
  <div style="background:#D85A30;color:white;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600">Layer 1 ✓ Income</div>
  <div style="color:#ccc;font-size:18px">→</div>
  <div style="background:#3A7FBF;color:white;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600">Layer 2: State</div>
  <div style="color:#ccc;font-size:18px">→</div>
  <div style="background:#ddd;color:#999;padding:4px 12px;border-radius:20px;font-size:12px">Layer 3: Care</div>
</div>`
)}

function _12(md){return(
md`
----

## Layer 2 — A better state does not save her.

Connecticut, Massachusetts, and New York rank among the best healthcare systems in the country. They are also among the worst places to be a Black mother. Filter by political lean, Medicaid expansion, or ranking type below and see what changes.
`
)}

function _panel2Controls(html)
{
  const container = html`<div style="
    display: flex;
    gap: 32px;
    align-items: flex-start;
    padding: 16px 20px;
    background: #f0f4fd;
    border-radius: 8px;
    margin: 12px 0;
    font-family: system-ui, sans-serif;
    border: 1px solid #ccd8f0;
    flex-wrap: wrap;
  ">
    <div>
      <div style="font-size:11px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px">Political lean</div>
      <div style="display:flex;gap:8px" id="political-buttons"></div>
    </div>
    <div>
      <div style="font-size:11px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px">Medicaid expansion</div>
      <div style="display:flex;gap:8px" id="medicaid-buttons"></div>
    </div>
    <div>
      <div style="font-size:11px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px">X-axis rank by</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap" id="rank-buttons"></div>
    </div>
  </div>`

  let state = {
    politicalFilter: "All",
    medicaidFilter: "All",
    rankType: "Overall health rank"
  }

  function makeButtonGroup(containerId, options, stateKey, colors = {}) {
    const wrapper = container.querySelector(`#${containerId}`)
    options.forEach(opt => {
      const btn = document.createElement("button")
      btn.textContent = opt
      const color = colors[opt] || "#3A7FBF"
      btn.style.cssText = `
        padding: 5px 14px;
        border-radius: 20px;
        border: 1.5px solid ${color};
        background: ${opt === state[stateKey] ? color : "white"};
        color: ${opt === state[stateKey] ? "white" : color};
        font-size: 12px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.15s;
      `
      btn.addEventListener("click", () => {
        state[stateKey] = opt
        wrapper.querySelectorAll("button").forEach(b => {
          const c = colors[b.textContent] || color
          b.style.background = b.textContent === opt ? c : "white"
          b.style.color = b.textContent === opt ? "white" : c
        })
        container.dispatchEvent(new CustomEvent("input", {bubbles: true}))
      })
      wrapper.appendChild(btn)
    })
  }

  makeButtonGroup("political-buttons",
    ["All", "Democrat", "Republican"],
    "politicalFilter",
    { "All": "#555", "Democrat": "#4477CC", "Republican": "#CC3333" }
  )

  makeButtonGroup("medicaid-buttons",
    ["All", "Expanded", "Not expanded"],
    "medicaidFilter",
    { "All": "#555", "Expanded": "#3A7FBF", "Not expanded": "#888" }
  )

  makeButtonGroup("rank-buttons",
    ["Overall health rank", "Reproductive care rank", "Racial equity rank"],
    "rankType",
    { "Overall health rank": "#3A7FBF", "Reproductive care rank": "#3A7FBF", "Racial equity rank": "#3A7FBF" }
  )

  container.value = state
  container.addEventListener("input", () => { container.value = state })
  return container
}


function _sketch2_filtered(sketch2,panel2Controls)
{
  let data = sketch2
  if (panel2Controls.politicalFilter !== "All")
    data = data.filter(d => d.political_lean === panel2Controls.politicalFilter)
  if (panel2Controls.medicaidFilter === "Expanded")
    data = data.filter(d => +d.medicaid_expanded === 1)
  if (panel2Controls.medicaidFilter === "Not expanded")
    data = data.filter(d => +d.medicaid_expanded === 0)
  return data
}


function _15(panel2Controls,sketch2_filtered,d3,COLORS,invalidation)
{
  const _ = panel2Controls
  const __ = sketch2_filtered
  const W = 700, H = 500
  const m = {top: 52, right: 20, bottom: 140, left: 72}
  const iW = W - m.left - m.right
  const iH = H - m.top - m.bottom
  

  // Pick x column based on rankType toggle
  const xCol = panel2Controls.rankType === "Overall health rank" ? "overall_rank"
    : panel2Controls.rankType === "Reproductive care rank" ? "reproductive_care_rank"
    : "racial_equity_rank"

  const svg = d3.create("svg")
    .attr("width", W).attr("height", H)
    .style("font-family","system-ui, sans-serif")
    .style("overflow","visible")

  const g = svg.append("g").attr("transform",`translate(${m.left},${m.top})`)

  // Tooltip div
  const tip = d3.select("body").append("div")
    .style("position","absolute").style("background","rgba(0,0,0,0.8)")
    .style("color","#fff").style("padding","8px 12px").style("border-radius","6px")
    .style("font-size","12px").style("pointer-events","none")
    .style("opacity",0).style("line-height","1.6")

  const xScale = d3.scaleLinear().domain([1, 51]).range([0, iW])
  const yScale = d3.scaleLinear().domain([0, 4.2]).range([iH, 0])

  // Gridlines
  g.append("g")
    .call(d3.axisLeft(yScale).ticks(6).tickSize(-iW).tickFormat(""))
    .call(ax => { ax.select(".domain").remove()
      ax.selectAll("line").style("stroke","#f0f0f0") })

  // Axes
  g.append("g").attr("transform",`translate(0,${iH})`)
    .call(d3.axisBottom(xScale).ticks(10))
    .call(ax => { ax.select(".domain").attr("stroke","#ccc")
      ax.selectAll("text").style("font-size","11px") })

  g.append("g")
    .call(d3.axisLeft(yScale).ticks(6))
    .call(ax => { ax.select(".domain").attr("stroke","#ccc")
      ax.selectAll("text").style("font-size","11px") })

  // Axis labels
  svg.append("text")
    .attr("x", m.left + iW/2).attr("y", H - 8)
    .attr("text-anchor","middle")
    .style("font-size","12px").style("fill","#555")
    .text(`Commonwealth Fund ${panel2Controls.rankType} (1 = Best)`)

  svg.append("text")
    .attr("transform","rotate(-90)")
    .attr("x", -(m.top + iH/2)).attr("y", 16)
    .attr("text-anchor","middle")
    .style("font-size","12px").style("fill","#555")
    .text("Black Maternal Mortality Rate per 100k")

  // Chart title — updates with filter
  svg.append("text")
    .attr("x", m.left).attr("y", 22)
    .style("font-size","13px").style("font-weight","600")
    .style("fill","#3A7FBF")
    .text(() => {
      const n = sketch2_filtered.length
      const suffix = (panel2Controls.politicalFilter && panel2Controls.politicalFilter !== "All") ? ` (${panel2Controls.politicalFilter} states only)` : ""
      return `${n} states shown — the gap persists${suffix}`
    })

  // Expected trend reference line
  g.append("line")
    .attr("x1",xScale(1)).attr("y1",yScale(3.8))
    .attr("x2",xScale(51)).attr("y2",yScale(0.3))
    .attr("stroke","#ddd").attr("stroke-width",1)
    .attr("stroke-dasharray","6 4")

  g.append("text")
    .attr("x",xScale(5)).attr("y",yScale(3.6))
    .style("font-size","10px").style("fill","#ccc").style("font-style","italic")
    .text("expected: better rank → lower mortality →")

  // Dots with tooltip
  g.selectAll("circle")
    .data(sketch2_filtered)
    .join("circle")
    .attr("cx", d => xScale(d[xCol]))
    .attr("cy", d => yScale(d.black_mortality_rate_per_100k))
    .attr("r", d => d.medicaid_expanded ? 8 : 4)
    .attr("fill", d => d.black_mortality_rate_per_100k === 0 
      ? "#F5C842"
      : (COLORS[d.political_lean] || "#aaa"))
    .attr("opacity", d => d.black_mortality_rate_per_100k === 0 ? 0.4 : 0.75)
    .attr("stroke","#fff").attr("stroke-width",1)
    .style("cursor","pointer")
    .on("mouseover", function(event, d) {
      d3.select(this).attr("r", d.medicaid_expanded ? 12 : 10).attr("opacity",1)
      tip.style("opacity",1)
        .html(`<strong>${d.state}</strong><br>
          Black mortality rate: <strong>${d.black_mortality_rate_per_100k}</strong> per 100k<br>
          Overall health rank: <strong>#${d.overall_rank}</strong><br>
          Political lean: <strong>${d.political_lean}</strong><br>
          Medicaid expanded: <strong>${d.medicaid_expanded ? "Yes" : "No"}</strong>`)
    })
    .on("mousemove", function(event) {
      tip.style("left", (event.pageX + 14) + "px")
         .style("top", (event.pageY - 28) + "px")
    })
    .on("mouseout", function(event, d) {
      d3.select(this).attr("r", d.medicaid_expanded ? 8 : 6).attr("opacity",0.75)
      tip.style("opacity",0)
    })

  // Label notable anomalies
  const anomalies = ["Connecticut","New York","Illinois","Massachusetts","New Jersey","Virginia","Kansas","Tennessee","Mississippi","Arkansas","Louisiana"]
  sketch2_filtered
    .filter(d => anomalies.includes(d.state))
    .forEach(d => {
      g.append("text")
        .attr("x", xScale(d[xCol]) + 10)
        .attr("y", yScale(d.black_mortality_rate_per_100k) - 4)
        .style("font-size","10px")
        .style("fill", COLORS[d.political_lean] || "#555")
        .style("font-weight","600")
        .text(d.state)
    })

  // Legend — placed below chart
  const legY = iH + m.top + 52
  const leg = svg.append("g")
    .attr("transform", `translate(${m.left}, ${legY})`)

  const legItems = [
    { label: "Democrat", color: COLORS.Democrat, r: 7, opacity: 0.75 },
    { label: "Republican", color: COLORS.Republican, r: 7, opacity: 0.75 },
    { label: "DC / other", color: "#aaa", r: 7, opacity: 0.75 },
    { label: "Suppressed (<10)", color: "#F5C842", r: 6, opacity: 0.6 },
    { label: "Medicaid expanded", color: "#999", r: 8, opacity: 0.75 },
    { label: "Not expanded", color: "#999", r: 4, opacity: 0.75 },
  ]

  const colW = 160
  legItems.forEach((item, i) => {
    const col = i % 4
    const row = Math.floor(i / 4)
    const lx = col * colW
    const ly = row * 24

    leg.append("circle")
      .attr("cx", lx + 7).attr("cy", ly + 7)
      .attr("r", item.r)
      .attr("fill", item.color)
      .attr("opacity", item.opacity)

    leg.append("text")
      .attr("x", lx + 20).attr("y", ly + 12)
      .style("font-size", "11px").style("fill", "#333")
      .text(item.label)
  })

  // Cleanup tooltip on cell invalidation
  invalidation.then(() => tip.remove())

  return svg.node()
}


function _16(htl){return(
htl.html`<div style="display:flex;gap:12px;align-items:center;margin:32px 0 8px;font-family:system-ui">
  <div style="background:#D85A30;color:white;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600">Layer 1 ✓ Income</div>
  <div style="color:#ccc;font-size:18px">→</div>
  <div style="background:#3A7FBF;color:white;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600">Layer 2 ✓ State</div>
  <div style="color:#ccc;font-size:18px">→</div>
  <div style="background:#1D9E75;color:white;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600">Layer 3: Care</div>
</div>`
)}

function _17(md){return(
md`
---

## Layer 3 — More care does not save her.

For white women, more education means more prenatal visits. For Black women, that relationship breaks down. A Black woman with a doctoral degree receives fewer prenatal visits than a white woman who never finished high school. Toggle the race lines below and watch how the Black line behaves compared to the others.
`
)}

function _panel3Controls(html)
{
  const container = html`<div style="
    display: flex;
    gap: 32px;
    align-items: flex-start;
    padding: 16px 20px;
    background: #f0fdf8;
    border-radius: 8px;
    margin: 12px 0;
    font-family: system-ui, sans-serif;
    border: 1px solid #b8e8d4;
  ">
    <div>
      <div style="font-size:11px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px">Show race lines</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap" id="race-toggle-buttons"></div>
    </div>
  </div>`

  const raceColors = {
    "Black": "#D85A30",
    "White": "#3A7FBF",
    "Native American": "#EF9F27",
    "Asian": "#888780"
  }

  let state = { visibleRaces: ["Black", "White", "Native American", "Asian"] }

  const wrapper = container.querySelector("#race-toggle-buttons")
    // Add "All" reset button first
  const allBtn = document.createElement("button")
  allBtn.textContent = "All"
  allBtn.style.cssText = `
    padding: 5px 14px;
    border-radius: 20px;
    border: 1.5px solid #555;
    background: #555;
    color: white;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s;
  `
  allBtn.addEventListener("click", () => {
    state.visibleRaces = ["Black", "White", "Native American", "Asian"]
    // Reset all race buttons to active state
    wrapper.querySelectorAll("button").forEach(b => {
      if (b.textContent !== "All") {
        const c = raceColors[b.textContent]
        b.style.background = c
        b.style.color = "white"
        b.style.opacity = "1"
      }
    })
    container.dispatchEvent(new CustomEvent("input", {bubbles: true}))
  })
  wrapper.appendChild(allBtn)
  
  Object.entries(raceColors).forEach(([race, color]) => {
    const btn = document.createElement("button")
    btn.textContent = race
    const isOn = () => state.visibleRaces.includes(race)
    const update = () => {
      btn.style.background = isOn() ? color : "white"
      btn.style.color = isOn() ? "white" : color
      btn.style.opacity = isOn() ? "1" : "0.6"
    }
    btn.style.cssText = `
      padding: 5px 14px;
      border-radius: 20px;
      border: 1.5px solid ${color};
      background: ${color};
      color: white;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s;
    `
    btn.addEventListener("click", () => {
        if (isOn()) {
      state.visibleRaces = state.visibleRaces.filter(r => r !== race)
    } else {
      state.visibleRaces = [...state.visibleRaces, race]
    }
    update()
    // Dim the All button when not all selected
    const allIsActive = state.visibleRaces.length === 4
    allBtn.style.background = allIsActive ? "#555" : "white"
    allBtn.style.color = allIsActive ? "white" : "#555"
    container.dispatchEvent(new CustomEvent("input", {bubbles: true}))
      })
    wrapper.appendChild(btn)
  })

  container.value = state
  container.addEventListener("input", () => { container.value = state })
  return container
}


function _19(panel3Controls,d3,prenatal,COLORS,invalidation)
{
  const _ = panel3Controls
  const W = 700, H = 420
  const m = {top: 52, right: 150, bottom: 72, left: 72}
  const iW = W - m.left - m.right
  const iH = H - m.top - m.bottom

  const eduLevels = ["No HS", "Some HS","HS Grad","Some College","Associate","Bachelor's","Master's","Doctorate"]
  const races = ["Black","White","Native American","Asian"]

  const svg = d3.create("svg")
    .attr("width", W).attr("height", H)
    .style("font-family","system-ui, sans-serif")
    .style("overflow","visible")

  const g = svg.append("g").attr("transform",`translate(${m.left},${m.top})`)

  // Tooltip
  const tip = d3.select("body").append("div")
    .style("position","absolute").style("background","rgba(0,0,0,0.8)")
    .style("color","#fff").style("padding","8px 12px").style("border-radius","6px")
    .style("font-size","12px").style("pointer-events","none")
    .style("opacity",0.75).style("line-height","1.6")

  const xScale = d3.scalePoint()
    .domain(eduLevels).range([0, iW]).padding(0.3)

  const yScale = d3.scaleLinear()
    .domain([6, 11]).range([iH, 0])

  // Gridlines
  g.append("g")
    .call(d3.axisLeft(yScale).ticks(5).tickSize(-iW).tickFormat(""))
    .call(ax => { ax.select(".domain").remove()
      ax.selectAll("line").style("stroke","#f0f0f0") })

  // Axes
  g.append("g").attr("transform",`translate(0,${iH})`)
    .call(d3.axisBottom(xScale))
    .call(ax => { ax.select(".domain").attr("stroke","#ccc")
      ax.selectAll("text").style("font-size","10px")
        .attr("transform","rotate(-20)").attr("text-anchor","end") })

  g.append("g")
    .call(d3.axisLeft(yScale).ticks(5))
    .call(ax => { ax.select(".domain").attr("stroke","#ccc")
      ax.selectAll("text").style("font-size","11px") })

  // Axis labels
  svg.append("text")
    .attr("x", m.left + iW/2).attr("y", H - 6)
    .attr("text-anchor","middle")
    .style("font-size","12px").style("fill","#555")
    .text("Mother's Education Level →")

  svg.append("text")
    .attr("transform","rotate(-90)")
    .attr("x", -(m.top + iH/2)).attr("y", 16)
    .attr("text-anchor","middle")
    .style("font-size","12px").style("fill","#555")
    .text("Avg Prenatal Care Visits")

  // Chart title
  svg.append("text")
    .attr("x", m.left).attr("y", 22)
    .style("font-size","13px").style("font-weight","600")
    .style("fill","#1D9E75")
    .text("Black women receive fewer visits — even with higher education")

  const line = d3.line()
    .x(d => xScale(d.edu_short))
    .y(d => yScale(d.avg_prenatal_visits))
    .curve(d3.curveMonotoneX)

  races.forEach(race => {
    const raceData = prenatal
      .filter(d => d.race === race)
      .sort((a, b) => a.edu_order - b.edu_order)

    if (!raceData.length) return

    const color = COLORS[race] || "#aaa"
    const isBlack = race === "Black"
    const isVisible = panel3Controls.visibleRaces.includes(race)
    const opacity = isVisible ? (isBlack? 1: 0.75) : 0

    // Line path
    g.append("path")
      .datum(raceData)
      .attr("fill","none")
      .attr("stroke", color)
      .attr("stroke-width", isBlack ? 3.5: 2)
      .attr("opacity", opacity)
      .style("display", isVisible ? "block" : "none")
      .attr("d", line)

    // Dots with tooltip
    g.selectAll(`.dot-${race.replace(/\s+/g,"-")}`)
      .data(raceData)
      .join("circle")
      .attr("cx", d => xScale(d.edu_short))
      .attr("cy", d => yScale(d.avg_prenatal_visits))
      .attr("r", isBlack ? 6 : 5)
      .attr("fill", color)
      .attr("opacity", opacity)
      .style("cursor", "pointer")
      .style("display", isVisible ? "block" : "none")
      .on("mouseover", function(event, d) {
        d3.select(this).attr("r", 9).attr("opacity",1)
        tip.style("opacity",1)
          .html(`<strong>${d.race}</strong><br>
            Education: <strong>${d.edu_short}</strong><br>
            Avg prenatal visits: <strong>${d.avg_prenatal_visits.toFixed(1)}</strong><br>
            Total births in group: <strong>${d3.format(",")(d.total_births)}</strong>`)
      })
      .on("mousemove", event => {
        tip.style("left",(event.pageX+14)+"px").style("top",(event.pageY-28)+"px")
      })
      .on("mouseout", function() {
        d3.select(this).attr("r", isBlack ? 6 : 5).attr("opacity", opacity)
        tip.style("opacity",0)
      })

    // End-of-line label
    const last = raceData[raceData.length - 1]
    g.append("text")
      .attr("x", xScale(last.edu_short) + 10)
      .attr("y", yScale(last.avg_prenatal_visits) + 4)
      .style("font-size","11px")
      .style("font-weight", isBlack ? "700" : "400")
      .style("fill", color)
      .style("opacity", isVisible ? 1 : 0)
      .text(race)
  })

  // Key annotation: Black line stays below White
  const blackDoc = prenatal.find(d => d.race === "Black" && d.edu_short === "Doctorate")
  const whiteNoHS = prenatal.find(d => d.race === "White" && d.edu_short === "No HS")
  if (blackDoc && whiteNoHS) {
    g.append("text")
      .attr("x", xScale("Master's") - 10)
      .attr("y", yScale(7.7))
      .style("font-size","10px").style("fill","#D85A30")
      .style("font-style","italic")
      .text("A Black woman with a doctorate")
    
    g.append("text")
      .attr("x", xScale("Master's") - 10)
      .attr("y", yScale(7.5))
      .style("font-size","10px").style("fill","#D85A30")
      .style("font-style","italic")
      .text("gets fewer visits than a white")
    
    g.append("text")
      .attr("x", xScale("Master's") - 10)
      .attr("y", yScale(7.3))
      .style("font-size","10px").style("fill","#D85A30")
      .style("font-style","italic")
      .text("woman with no high school diploma.")
    
    g.append("text")
      .attr("x", xScale("Master's") - 10)
      .attr("y", yScale(7.05))
      .style("font-size","10px").style("fill","#D85A30")
      .style("font-weight","600")
      .text("Race trumps education.")
  }

  invalidation.then(() => tip.remove())
  return svg.node()
}


function _20(md){return(
md`
---

## So what?

Income did not close it. State quality did not close it. Medicaid expansion did not close it. Education did not close it. Prenatal care did not close it.

**This is not a resource problem. It is a design problem.** The American healthcare system was built around a default patient. That patient is not a Black woman. Giving Black women more access to a system that was not built for them does not protect them. It gives them more contact with something that is already failing them.

*Seven in ten Black maternal deaths are caused by hemorrhage or hypertension. Both are preventable. The tools to catch and treat them exist. The gap is in who they reach.*

---
**Data sources:** CDC Wonder Underlying Cause of Death 2018–2024 (ICD-10 O00–O99) · CDC Natality 2016–2024 · Commonwealth Fund 2023 State Health System Performance · MIT Election Data Lab 2020 Presidential Returns · KFF Medicaid Expansion Status September 2025 · U.S. Census Bureau ACS 2023 Median Household Income by Race · Census Bureau State Population Estimates 2020–2024
`
)}

function _21(d3)
{
  const W = 700, H = 260
  const m = {top: 50, right: 30, bottom: 40, left: 30}
  const panelW = (W - m.left - m.right - 60) / 3
  const iH = H - m.top - m.bottom

  const svg = d3.create("svg")
    .attr("width", W).attr("height", H)
    .style("font-family", "system-ui, sans-serif")
    .style("overflow", "visible")

  // Overall title
  svg.append("text")
    .attr("x", W / 2).attr("y", 22)
    .attr("text-anchor", "middle")
    .style("font-size", "14px").style("font-weight", "700")
    .style("fill", "#D85A30")
    .text("Three layers. One gap. No fix.")

  svg.append("text")
    .attr("x", W / 2).attr("y", 40)
    .attr("text-anchor", "middle")
    .style("font-size", "11px").style("fill", "#888")
    .text("Black women remain at higher risk across every dimension measured")

  const panels = [
    {
      title: "By income",
      subtitle: "median household",
      leftLabel: "Black  $56k",
      rightLabel: "White  $89k",
      leftVal: 0.15,
      rightVal: 0.72,
      leftRate: "40.2 per 100k",
      rightRate: "15.4 per 100k",
      color: "#D85A30"
    },
    {
      title: "By state quality",
      subtitle: "best-ranked states only",
      leftLabel: "Black mothers",
      rightLabel: "Expected rate",
      leftVal: 0.18,
      rightVal: 0.78,
      leftRate: "still 2.6× higher",
      rightRate: "gap should close",
      color: "#3A7FBF"
    },
    {
      title: "By prenatal care",
      subtitle: "doctorate-level mothers",
      leftLabel: "Black  8.3 visits",
      rightLabel: "White  9.1 visits",
      leftVal: 0.2,
      rightVal: 0.82,
      leftRate: "fewer visits",
      rightRate: "more visits",
      color: "#1D9E75"
    }
  ]

  panels.forEach((p, i) => {
    const ox = m.left + i * (panelW + 30)
    const pg = svg.append("g").attr("transform", `translate(${ox}, ${m.top})`)

    // Panel background
    pg.append("rect")
      .attr("x", 0).attr("y", 0)
      .attr("width", panelW).attr("height", iH)
      .attr("rx", 6)
      .attr("fill", "#fafafa")
      .attr("stroke", "#eee").attr("stroke-width", 1)

    // Panel title
    pg.append("text")
      .attr("x", panelW / 2).attr("y", 20)
      .attr("text-anchor", "middle")
      .style("font-size", "12px").style("font-weight", "600")
      .style("fill", p.color)
      .text(p.title)

    pg.append("text")
      .attr("x", panelW / 2).attr("y", 34)
      .attr("text-anchor", "middle")
      .style("font-size", "10px").style("fill", "#aaa")
      .text(p.subtitle)

    // Track line
    const trackY = iH * 0.62
    pg.append("line")
      .attr("x1", panelW * 0.1).attr("x2", panelW * 0.9)
      .attr("y1", trackY).attr("y2", trackY)
      .attr("stroke", "#e0e0e0").attr("stroke-width", 2)

    // Gap shading between the two dots
    pg.append("rect")
      .attr("x", panelW * p.leftVal)
      .attr("y", trackY - 3)
      .attr("width", panelW * (p.rightVal - p.leftVal))
      .attr("height", 6)
      .attr("fill", p.color)
      .attr("opacity", 0.15)

    // Black dot (left — worse position)
    pg.append("circle")
      .attr("cx", panelW * p.leftVal)
      .attr("cy", trackY)
      .attr("r", 9)
      .attr("fill", "#D85A30")
      .attr("stroke", "#fff").attr("stroke-width", 1.5)

    // White/comparison dot (right — better position)
    pg.append("circle")
      .attr("cx", panelW * p.rightVal)
      .attr("cy", trackY)
      .attr("r", 9)
      .attr("fill", "#3A7FBF")
      .attr("opacity", 0.7)
      .attr("stroke", "#fff").attr("stroke-width", 1.5)

    // Labels above dots
    pg.append("text")
      .attr("x", panelW * p.leftVal)
      .attr("y", trackY - 16)
      .attr("text-anchor", "middle")
      .style("font-size", "9px").style("fill", "#D85A30").style("font-weight", "600")
      .text(p.leftLabel)

    pg.append("text")
      .attr("x", panelW * p.rightVal)
      .attr("y", trackY - 16)
      .attr("text-anchor", "middle")
      .style("font-size", "9px").style("fill", "#3A7FBF").style("font-weight", "600")
      .text(p.rightLabel)

    // Rate labels below dots
    pg.append("text")
      .attr("x", panelW * p.leftVal)
      .attr("y", trackY + 20)
      .attr("text-anchor", "middle")
      .style("font-size", "9px").style("fill", "#D85A30")
      .text(p.leftRate)

    pg.append("text")
      .attr("x", panelW * p.rightVal)
      .attr("y", trackY + 20)
      .attr("text-anchor", "middle")
      .style("font-size", "9px").style("fill", "#666")
      .text(p.rightRate)
  })

  return svg.node()
}


export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["prenatal_by_race_education.csv", {url: new URL("./files/1575e5d3a725d673095a5a6e67c041e14c1787e1b39d627e40d201cb19ae11124a57c861318d069c6d9f99ec79633aecbcf220e2f7862d36ea0c40f6f414fef6.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["sketch1_mortality_income.csv", {url: new URL("./files/516966ca94b95647b75b35ca50c2d579401727c4d50723dd650c534becede883c8c341b1d7872fc3170bef80baf0852dd72e3a7658ee59a73bf596c624823cf4.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["sketch2_state_black_mortality@1.csv", {url: new URL("./files/8240d69ebc33ab62f413081d7a31219f1e16511da5428932139768b6525785c6bdee1525c47dcb020f947a4c77a334554ccf00e4cf2c3c1f4eda9dd64a707e57.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  main.variable(observer("sketch1")).define("sketch1", ["FileAttachment"], _sketch1);
  main.variable(observer("sketch2")).define("sketch2", ["FileAttachment"], _sketch2);
  main.variable(observer("prenatal")).define("prenatal", ["FileAttachment"], _prenatal);
  main.variable(observer("COLORS")).define("COLORS", _COLORS);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("viewof panel1Controls")).define("viewof panel1Controls", ["html"], _panel1Controls);
  main.variable(observer("panel1Controls")).define("panel1Controls", ["Generators", "viewof panel1Controls"], (G, _) => G.input(_));
  main.variable(observer()).define(["d3"], _9);
  main.variable(observer()).define(["panel1Controls","d3","sketch1","COLORS","invalidation"], _10);
  main.variable(observer()).define(["htl"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("viewof panel2Controls")).define("viewof panel2Controls", ["html"], _panel2Controls);
  main.variable(observer("panel2Controls")).define("panel2Controls", ["Generators", "viewof panel2Controls"], (G, _) => G.input(_));
  main.variable(observer("sketch2_filtered")).define("sketch2_filtered", ["sketch2","panel2Controls"], _sketch2_filtered);
  main.variable(observer()).define(["panel2Controls","sketch2_filtered","d3","COLORS","invalidation"], _15);
  main.variable(observer()).define(["htl"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("viewof panel3Controls")).define("viewof panel3Controls", ["html"], _panel3Controls);
  main.variable(observer("panel3Controls")).define("panel3Controls", ["Generators", "viewof panel3Controls"], (G, _) => G.input(_));
  main.variable(observer()).define(["panel3Controls","d3","prenatal","COLORS","invalidation"], _19);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer("closingChart")).define(["d3"], _21);  return main;
}
