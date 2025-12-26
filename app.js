
// FILE SAFE VERSION - NO MODULES

const $ = q => document.querySelector(q);
const $$ = q => document.querySelectorAll(q);

const state = JSON.parse(localStorage.getItem("seguimiento_state")) || {
  settings:{baseCash:90000,weeklyIncome:215000,debtTotal:570000},
  fitness:[],
  finance:[]
};

function save(){ localStorage.setItem("seguimiento_state", JSON.stringify(state)); }

function toast(t){
  const el=$("#toast");
  el.textContent=t; el.style.display="block";
  setTimeout(()=>el.style.display="none",1500);
}

$$(".tab").forEach(b=>{
  b.onclick=()=>{
    $$(".tab").forEach(x=>x.classList.remove("is-active"));
    b.classList.add("is-active");
    render(b.dataset.route);
  };
});

function render(route){
  if(route==="fitness") renderFitness();
  else if(route==="finance") renderFinance();
  else if(route==="settings") renderSettings();
  else renderDashboard();
}

function renderDashboard(){
  const kcal = state.fitness.reduce((a,b)=>a+(b.cal||0),0);
  const cash = state.settings.baseCash +
    state.finance.filter(x=>x.type==="ingreso").reduce((a,b)=>a+b.amount,0) -
    state.finance.filter(x=>x.type!=="ingreso").reduce((a,b)=>a+b.amount,0);

  $("#view").innerHTML=`
    <div class="card">
      <h2>Dashboard</h2>
      <p>Calorías totales: <b>${kcal}</b></p>
      <p>Caja actual: <b>$${cash}</b></p>
    </div>`;
}

function renderFitness(){
  $("#view").innerHTML=`
    <div class="card">
      <h2>Fitness</h2>
      <input id="fdate" type="date"/>
      <input id="fcal" type="number" placeholder="Calorías"/>
      <button class="btn" onclick="addFitness()">Guardar</button>
    </div>
    <div class="card">
      ${state.fitness.map(f=>`<div>${f.date} - ${f.cal} kcal</div>`).join("")}
    </div>`;
}

function addFitness(){
  state.fitness.push({date:$("#fdate").value, cal:+$("#fcal").value});
  save(); toast("Sesión guardada"); renderFitness();
}

function renderFinance(){
  $("#view").innerHTML=`
    <div class="card">
      <h2>Finanzas</h2>
      <input id="famount" type="number" placeholder="Monto"/>
      <select id="ftype">
        <option value="ingreso">Ingreso</option>
        <option value="gasto">Gasto</option>
      </select>
      <button class="btn" onclick="addFinance()">Guardar</button>
    </div>
    <div class="card">
      ${state.finance.map(f=>`<div>${f.type}: $${f.amount}</div>`).join("")}
    </div>`;
}

function addFinance(){
  state.finance.push({amount:+$("#famount").value,type:$("#ftype").value});
  save(); toast("Movimiento guardado"); renderFinance();
}

function renderSettings(){
  $("#view").innerHTML=`
    <div class="card">
      <h2>Ajustes</h2>
      <p>Base: $${state.settings.baseCash}</p>
      <p>Ingreso semanal: $${state.settings.weeklyIncome}</p>
      <p>Deuda: $${state.settings.debtTotal}</p>
    </div>`;
}

render("dashboard");
