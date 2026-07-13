import { useState, useEffect, useRef } from 'react'
import { getFile } from './data/files.js'

/* ─── DATA ─── */
const MEMBERS = [
  {
    id: 'DL', initials: 'DL', color: '#8aa9a3', photo: '/didier.jpg',
    name: 'Didier Sneider Londoño Vanegas ', role: 'Aprendiz ADSO · SENA',
    spec: 'Poética · Función Emotiva',
    tags: ['Poética', 'Función Emotiva', 'Expresión'],
    desc: 'Mostré interés por fortalecer mis habilidades comunicativas desde el lenguaje literario. Aporté responsabilidad, creatividad y buena actitud para representar la función emotiva y el uso poético del lenguaje en el trabajo de equipo.',
    reflexion: 'Durante esta formación comprendí que el lenguaje no solo sirve para informar, sino también para expresar sentimientos y estados de ánimo. La función emotiva me permitió reconocer cómo hablamos en primera persona, usamos exclamaciones y recursos afectivos para transmitir lo que sentimos. Al mismo tiempo, la función poética me mostró que las palabras pueden usarse de forma estética, jugando con el sonido, el ritmo y las figuras literarias para darle belleza y fuerza expresiva al mensaje. Este aprendizaje transformó mi manera de comunicarme, haciéndome más consciente de cómo elegir las palabras no solo para informar, sino también para conmover.',
    works: [
      { title: 'Cuento — La Sapa Caramelo', desc: 'Cuento creativo escrito con recursos poéticos, donde predomina la función emotiva a través de los sentimientos de los personajes.', type: 'Word · Cuento' },
      { title: 'Taller Tipos de Comunicación', desc: 'Análisis sobre la función emotiva y la función poética del lenguaje, con ejemplos de uso cotidiano y literario.', type: 'Word · Taller' },
      { title: 'Presentación: Funciones del Lenguaje', desc: 'Presentación en PowerPoint sobre las funciones del lenguaje con énfasis en la función emotiva y el uso poético de las palabras.', type: 'PPT · Presentación' },
      { title: 'Investigación: Comunicación No Verbal', desc: 'Investigación sobre cómo los sentimientos y estados de ánimo se expresan a través del lenguaje emotivo y poético.', type: 'Word · Investigación' },
    ],
  },
  {
    id: 'TZ', initials: 'TZ', color: '#d9a6a0', photo: '/tomas.jpg',
    name: 'Tomas Zuleta Grajales', role: 'Aprendiz ADSO · SENA',
    spec: 'No verbal · Función Metalingüística',
    tags: ['No verbal', 'Función Metalingüística', 'Comunicación'],
    desc: 'Me interesó aprender nuevas formas de comunicación, tanto corporales como del lenguaje mismo. Mis fortalezas fueron la escucha activa y la capacidad de explicar y aclarar el significado de las palabras, contribuyendo a una mejor coordinación del equipo.',
    reflexion: 'Durante este proceso de aprendizaje comprendí que la comunicación no depende únicamente de las palabras, sino también de los gestos, posturas y expresiones corporales que acompañan el mensaje. El estudio de la comunicación no verbal me permitió entender que el cuerpo habla incluso en silencio. Además, aprender sobre la función metalingüística me mostró la importancia de usar el lenguaje para explicar el lenguaje mismo, es decir, aclarar el significado de una palabra o expresión cuando el mensaje no queda claro para el receptor. Esta combinación me ayudó a comunicarme de forma más clara y comprensible.',
    works: [
      { title: 'Cuento — La Sapa Caramelo', desc: 'Versión del cuento que resalta los gestos y posturas de los personajes, apoyada en aclaraciones metalingüísticas dentro del diálogo.', type: 'Word · Cuento' },
      { title: 'Taller Tipos de Comunicación', desc: 'Estudio sobre la comunicación no verbal y la función metalingüística: cómo el lenguaje se usa para explicarse a sí mismo.', type: 'Word · Taller' },
      { title: 'Presentación: Funciones del Lenguaje', desc: 'Presentación en PowerPoint sobre las funciones del lenguaje con énfasis en la función metalingüística.', type: 'PPT · Presentación' },
      { title: 'Investigación: Comunicación No Verbal', desc: 'Investigación sobre el lenguaje corporal, gestos y su impacto en la comunicación interpersonal.', type: 'Word · Investigación' },
    ],
  },
  {
    id: 'AM', initials: 'AM', color: '#dcb88a', photo: '/anyelo.jpg',
    name: 'Anyelo Benitez Martinez', role: 'Aprendiz ADSO · SENA',
    spec: 'Referencial · Microexpresiones',
    tags: ['Función Referencial', 'Microexpresiones', 'Análisis'],
    desc: 'Participé con compromiso y disposición para aprender a comunicar información de forma objetiva y a interpretar las expresiones faciales breves e involuntarias. Aporté análisis, comunicación clara y apoyo constante para fortalecer el trabajo del grupo.',
    reflexion: 'Durante esta formación comprendí que la comunicación también cumple una función informativa, centrada en dar a conocer hechos y datos de manera objetiva: esta es la función referencial del lenguaje. Además, aprender sobre las microexpresiones me permitió entender que existen gestos faciales muy breves e involuntarios que revelan las emociones reales de una persona, incluso cuando intenta ocultarlas. Reconocer estas señales me mostró que, más allá de lo que decimos con palabras, el rostro comunica verdades que a veces las palabras no logran expresar.',
    works: [
      { title: 'Cuento — La Sapa Caramelo', desc: 'Cuento que combina un relato objetivo de los hechos con descripciones de microexpresiones que delatan las emociones reales de los personajes.', type: 'Word · Cuento' },
      { title: 'Taller Tipos de Comunicación', desc: 'Análisis sobre la función referencial del lenguaje y las microexpresiones como forma de comunicación emocional involuntaria.', type: 'Word · Taller' },
      { title: 'Presentación: Funciones del Lenguaje', desc: 'Presentación sobre las funciones del lenguaje con énfasis en la función referencial.', type: 'PPT · Presentación' },
      { title: 'Investigación: Comunicación No Verbal', desc: 'Investigación sobre las microexpresiones faciales, su duración, tipos y su papel en la detección de emociones ocultas.', type: 'Word · Investigación' },
    ],
  },
]
const NAV_ITEMS = [
  { id:'intro',    label:'Introducción' },
  { id:'temas',    label:'Temas' },
  { id:'reflexion',label:'Reflexión' },
  { id:'tipos',    label:'Tipos' },
  { id:'evidencias',label:'Evidencias' },
  { id:'equipo',   label:'Equipo' },
  { id:'aprend',   label:'Aprendizajes' },
]

/* ─── LOADER ─── */
function Loader({ onDone }) {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const intervals = [
      setTimeout(() => setPct(30), 300),
      setTimeout(() => setPct(65), 800),
      setTimeout(() => setPct(90), 1400),
      setTimeout(() => setPct(100), 1800),
      setTimeout(() => onDone(), 2400),
    ]
    return () => intervals.forEach(clearTimeout)
  }, [])
  return (
    <div id="loader">
      <div className="ld-logo">ADSO · SENA · 2026</div>
      <div className="ld-ring">
        <svg viewBox="0 0 80 80">
          <circle className="track" cx="40" cy="40" r="34" />
          <circle className="arc"   cx="40" cy="40" r="34" />
        </svg>
      </div>
      <div className="ld-bar-wrap"><div className="ld-bar" /></div>
      <div className="ld-pct">{pct}%</div>
    </div>
  )
}

/* ─── SIDE NAV ─── */
function SideNav() {
  const [active, setActive] = useState('intro')
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -50% 0px' }
    )
    NAV_ITEMS.forEach(n => { const el = document.getElementById(n.id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])
  return (
    <nav className="sidenav">
      {NAV_ITEMS.map(n => (
        <a key={n.id} className={`sn-item${active===n.id?' active':''}`} href={`#${n.id}`}>
          <span className="sn-label">{n.label}</span>
          <span className="sn-dot" />
        </a>
      ))}
    </nav>
  )
}

/* ─── TOP BAR ─── */
function TopBar() {
  return (
    <div className="topbar">
      <span className="tb-brand">ADSO.SENA</span>
      <span className="tb-tag">Comunicación Asertiva · 2026</span>
    </div>
  )
}

/* ─── HERO ─── */
function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-scan" />
      <div className="hero-left">
        <p className="hero-eyebrow">Competencia de Comunicaciones</p>
        <h1 className="hero-h1">
          La comunicación<br/>
          <mark>asertiva</mark><br/>
          hace mejor <span className="outline">software</span>
        </h1>
        <p className="hero-desc">
          Un tecnólogo que comunica con claridad y respeto construye equipos sólidos,
          entiende requisitos reales y entrega productos que funcionan.
        </p>
        <div className="hero-actions">
          <a href="#intro" className="btn-c">Ver proyecto</a>
          <a href="#equipo" className="btn-o">Conocer el equipo</a>
        </div>
        <div className="hero-metrics">
          <div className="hm-card"><div className="hm-num">07</div><div className="hm-lbl">Temas explorados</div></div>
          <div className="hm-card"><div className="hm-num">03</div><div className="hm-lbl">Integrantes</div></div>
          <div className="hm-card"><div className="hm-num">12</div><div className="hm-lbl">Evidencias</div></div>
          <div className="hm-card"><div className="hm-num">01</div><div className="hm-lbl">Trimestre</div></div>
        </div>
      </div>
      <div className="hero-right">
        <div className="hero-terminal">
          <div className="term-bar">
            <div className="term-dot" style={{background:'#ff5f57'}} />
            <div className="term-dot" style={{background:'#ffbd2e'}} />
            <div className="term-dot" style={{background:'#28ca41'}} />
          </div>
          <div className="term-body">
            {[
              { prompt:'$', cmd:'definir comunicacion' },
              { out:'Proceso de transmisión de ideas,', ok:false },
              { out:'emociones e información entre', ok:false },
              { out:'personas usando un código común.', ok:false },
              null,
              { prompt:'$', cmd:'importancia --contexto software' },
              { out:'[OK] Claridad en requisitos', ok:true },
              { out:'[OK] Colaboración efectiva', ok:true },
              { out:'[OK] Resolución de conflictos', ok:true },
              { out:'[OK] Feedback constructivo', ok:true },
              null,
              { prompt:'$', cmd:'estado del equipo', cursor:true },
            ].map((l, i) => {
              if (!l) return <div key={i} style={{height:'0.6rem'}} />
              if (l.prompt) return (
                <div className="term-line" key={i}>
                  <span className="term-prompt">{l.prompt}</span>
                  <span className="term-cmd">{l.cmd}{l.cursor && <span className="term-cursor" />}</span>
                </div>
              )
              return <div className="term-line term-out" key={i} style={l.ok?{color:'#7a9e85'}:{}}>{l.out}</div>
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── INTRO ─── */
function Intro() {
  return (
    <section className="sec" id="intro">
      <div className="container">
        <p className="sec-tag">01 · introducción</p>
        <h2 className="sec-h2">¿Qué es comunicar<br/>y por qué cambia todo?</h2>
        <div className="intro-layout">
          <div>
            <div className="big-quote">"</div>
            <div className="intro-text">
              <p>La comunicación es el proceso mediante el cual las personas transmiten <strong>ideas, emociones e información</strong>. No se trata solo de hablar o escribir, sino de ser comprendidos y de comprender al otro de manera genuina.</p>
              <p>En el desarrollo de software, esta capacidad es tan crucial como saber programar: un sistema técnicamente perfecto <strong>falla si los requisitos fueron malentendidos</strong>.</p>
              <p>Un tecnólogo que comunica con claridad y respeto logra coordinar equipos, gestionar expectativas y entregar software de <strong>alta calidad</strong>, evitando errores costosos y retrabajo innecesario.</p>
            </div>
          </div>
          <div className="pillars-grid">
            {[
              ['🎯','Claridad en Requisitos','Evita malentendidos y retrabajo desde el inicio del proyecto.'],
              ['🤝','Colaboración Efectiva','Genera un ambiente donde todos aportan libremente sus ideas.'],
              ['🛡️','Resolución de Conflictos','Transforma diferencias en soluciones mutuamente beneficiosas.'],
              ['📈','Mejora Continua','El feedback constructivo impulsa el crecimiento del equipo.'],
            ].map(([ic,t,d]) => (
              <div className="pillar-cell" key={t}>
                <div className="p-icon">{ic}</div>
                <div className="p-title">{t}</div>
                <div className="p-desc">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── TEMAS ─── */
function Temas() {
  const items = [
    { num:'01', icon:'💬', title:'Comunicación Asertiva', desc:'Expresar ideas, opiniones y necesidades de forma clara, honesta y respetuosa, sin agresividad ni pasividad.', badge:'Core Skill' },
    { num:'02', icon:'🔀', title:'Tipos de Comunicación', desc:'Verbal, no verbal, escrita, digital. Cada canal tiene su propia dinámica e impacto en el entorno profesional.', badge:'Fundamento' },
    { num:'03', icon:'👥', title:'Trabajo en Equipo', desc:'Sinergia y colaboración entre miembros con roles definidos para lograr objetivos comunes de manera eficiente.', badge:'Colaboración' },
    { num:'04', icon:'⚖️', title:'Resolución de Conflictos', desc:'Estrategias para gestionar y transformar desacuerdos en oportunidades de mejora dentro del equipo.', badge:'Gestión' },
  ]
  return (
    <section className="sec" id="temas">
      <div className="container">
        <p className="sec-tag">02 · formación</p>
        <h2 className="sec-h2">Temáticas vistas<br/>en la competencia</h2>
        <div className="timeline">
          <div className="tl-track">
            {items.map(t => (
              <div className="tl-item" key={t.num}>
                <div className="tl-num">{t.num}</div>
                <div className="tl-icon">{t.icon}</div>
                <div className="tl-title">{t.title}</div>
                <div className="tl-desc">{t.desc}</div>
                <span className="tl-badge">{t.badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── REFLEXION ─── */
function Reflexion() {
  return (
    <section className="sec" id="reflexion">
      <div className="container">
        <p className="sec-tag">03 · reflexión del reto</p>
        <h2 className="sec-h2">Lo que aprendimos<br/>sobre los tipos de comunicación</h2>
        <div className="ref-cinema">
          <p className="ref-main">
            Aprendimos que la comunicación <em>verbal y no verbal</em> influyen directamente
            en la convivencia, el trabajo colaborativo y el entendimiento entre las personas.
            Expresarnos correctamente mejora la <em>resolución de problemas</em> y fortalece
            las relaciones personales y profesionales. En el desarrollo de software,
            cada gesto, tono y palabra comunican algo. Reconocer esto nos hace
            <em> mejores tecnólogos</em> y mejores personas.
          </p>
          <div className="ref-meta">
            <span className="ref-pill">ADSO · Ficha 3256502</span>
            <span className="ref-pill">SENA · Competencia Comunicaciones</span>
            <span className="ref-pill">2026</span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── TIPOS ─── */
function Tipos() {
  const tipos = [
    { num:'01', icon:'🗣️', title:'Verbal', desc:'Palabras habladas o escritas. En software: reuniones, code reviews, correos y documentación. El tono determina si el mensaje es recibido con apertura.', tag:'Oral y escrita', tc:'bt-c' },
    { num:'02', icon:'🤲', title:'No Verbal', desc:'Gestos, posturas y expresiones. En videollamadas revelan señales que complementan o contradicen el mensaje verbal, clave para la confianza.', tag:'Corporal y gestual', tc:'bt-g' },
    { num:'03', icon:'🎙️', title:'Paraverbal', desc:'Tono, volumen, velocidad y pausas. Un dev que presenta con voz firme transmite seguridad; hablar muy rápido genera confusión aunque el contenido sea correcto.', tag:'Tono y ritmo', tc:'bt-c' },
    { num:'04', icon:'💻', title:'Digital', desc:'Slack, correo, GitHub Issues, Jira. Requiere claridad extra porque carece de tono; un mensaje mal redactado puede malinterpretarse y generar conflictos.', tag:'Herramientas', tc:'bt-g' },
  ]
  return (
    <section className="sec" id="tipos">
      <div className="container">
        <p className="sec-tag">03b · contenido</p>
        <h2 className="sec-h2">Los cuatro tipos<br/>de comunicación</h2>
        <div className="bento">
          {tipos.map(t => (
            <div className="bento-cell" key={t.num}>
              <div className="bento-num">{t.num}</div>
              <div className="bento-icon">{t.icon}</div>
              <div className="bento-title">{t.title}</div>
              <div className="bento-desc">{t.desc}</div>
              <span className={`bento-tag ${t.tc}`}>{t.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── EVIDENCIAS (archivos embebidos en base64) ─── */
function base64ToBlob(base64, mime) {
  const byteChars = atob(base64)
  const byteNumbers = new Array(byteChars.length)
  for (let i = 0; i < byteChars.length; i++) byteNumbers[i] = byteChars.charCodeAt(i)
  return new Blob([new Uint8Array(byteNumbers)], { type: mime })
}

function downloadFile(file) {
  const blob = base64ToBlob(file.data, file.mimeType)
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = file.fileName
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

function EvGroup({ m }) {
  return (
    <div className="ev-group" id={`ev-${m.id}`}>
      <div className="ev-ghead">
        <div className="ev-av" style={{background: m.color}}>{m.initials}</div>
        <div>
          <div className="ev-gname">{m.name}</div>
          <div className="ev-grole">{m.role}</div>
        </div>
        <span className="ev-gspec">{m.spec}</span>
      </div>
      <div className="ev-gcards">
        {m.works.map((w, i) => {
          const file = getFile(m.id, i)
          return (
            <div className="ev-card" key={i}>
              <div className="ev-ctype">{w.type}</div>
              <div className="ev-ctitle">{w.title}</div>
              <div className="ev-cdesc">{w.desc}</div>
              {file ? (
                <>
                  <div className="ev-filebox">
                    <span className="ev-fileicon">📎</span>
                    <span className="ev-filename">{file.fileName}</span>
                  </div>
                  <button className="ev-download" onClick={() => downloadFile(file)}>
                    ⬇ Descargar archivo
                  </button>
                </>
              ) : (
                <div className="ev-pending">Archivo pendiente de subir</div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Evidencias() {
  return (
    <section className="sec" id="evidencias">
      <div className="container">
        <p className="sec-tag">04 · evidencias</p>
        <h2 className="sec-h2">Trabajos y<br/>actividades</h2>
        <p className="sec-lead">Cada evidencia es un archivo real (Word, PDF, PPTX) que cualquier visitante puede descargar directamente desde la página.</p>
        <div className="ev-wrap">
          {MEMBERS.map(m => <EvGroup key={m.id} m={m} />)}
        </div>
      </div>
    </section>
  )
}

/* ─── MODAL ─── */
function Modal({ m, onClose }) {
  useEffect(() => {
    const h = e => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', h)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', h); document.body.style.overflow = '' }
  }, [])
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="m-close" onClick={onClose}>✕</button>
        <div className="m-top">
          <div className="m-av" style={{background: m.color}}>
            {m.photo ? <img src={m.photo} alt={m.name}/> : m.initials}
          </div>
          <div>
            <p className="m-name">{m.name}</p>
            <p className="m-role">{m.role}</p>
            <p className="m-spec">{m.spec}</p>
          </div>
        </div>
        <div className="m-chips">{m.tags.map(t=><span className="m-chip" key={t}>{t}</span>)}</div>
        <hr className="m-hr"/>
        <p className="m-slabel">Descripción</p>
        <p className="m-text" style={{marginBottom:'1.25rem'}}>{m.desc}</p>
        <p className="m-slabel">Reflexión del trimestre</p>
        <p className="m-qtext" style={{marginBottom:'1.5rem'}}>"{m.reflexion}"</p>
        <p className="m-slabel">Evidencias</p>
        {m.works.map((w,i)=>(
          <div className="m-work" key={i}>
            <span className="m-wn">0{i+1}</span>
            <div><p className="m-wt">{w.title}</p><p className="m-wd">{w.desc}</p></div>
          </div>
        ))}
        <a href={`#ev-${m.id}`} onClick={onClose} className="m-evbtn">Ver todas las evidencias →</a>
      </div>
    </div>
  )
}

/* ─── EQUIPO ─── */
function Equipo() {
  const [sel, setSel] = useState(null)
  return (
    <section className="sec" id="equipo">
      <div className="container">
        <p className="sec-tag">05 · equipo</p>
        <h2 className="sec-h2">Integrantes<br/>del grupo</h2>
        <p className="sec-lead">Haz clic en cualquier fila para ver el perfil completo, reflexión y evidencias de cada integrante.</p>
        <div className="team-list">
          {MEMBERS.map(m=>(
            <div className="team-row" key={m.id} onClick={()=>setSel(m)}
              role="button" tabIndex={0} onKeyDown={e=>e.key==='Enter'&&setSel(m)}>
              <div className="team-av" style={{background:m.color}}>
                {m.photo ? <img src={m.photo} alt={m.name}/> : m.initials}
              </div>
              <div>
                <p className="team-name">{m.name}</p>
                <p className="team-role">{m.role} · {m.spec}</p>
                <div className="team-tags">{m.tags.map(t=><span className="team-tag" key={t}>{t}</span>)}</div>
              </div>
              <span className="team-arrow">Ver perfil →</span>
            </div>
          ))}
        </div>
      </div>
      {sel && <Modal m={sel} onClose={()=>setSel(null)}/>}
    </section>
  )
}

/* ─── APRENDIZAJES (acordeón) ─── */
function Aprendizajes() {
  const [open, setOpen] = useState(null)
  const bodyRefs = useRef({})

  const toggle = id => setOpen(p => p===id ? null : id)

  return (
    <section className="sec" id="aprend">
      <div className="container">
        <p className="sec-tag">06 · reflexión final</p>
        <h2 className="sec-h2">Lo aprendido por<br/>cada aprendiz</h2>
        <div className="accord">
          {MEMBERS.map(m=>{
            const isOpen = open===m.id
            return (
              <div className={`ac-item${isOpen?' open':''}`} key={m.id}>
                <div className="ac-head" onClick={()=>toggle(m.id)}>
                  <div className="ac-av" style={{background:m.color}}>{m.initials}</div>
                  <div>
                    <div className="ac-name">{m.name}</div>
                    <div className="ac-role">{m.role}</div>
                  </div>
                  <span className="ac-chevron">▾</span>
                </div>
                <div className="ac-body" style={{maxHeight: isOpen ? '600px' : '0'}}>
                  <p className="ac-inner">"{m.reflexion}"</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer">
          <div>
            <div className="ft-brand">ADSO.SENA</div>
            <p className="ft-desc">Proyecto desarrollado como evidencia de la competencia de Comunicaciones del programa Tecnología en Análisis y Desarrollo de Software — SENA 2026.</p>
          </div>
          <div className="ft-col">
            <h4>Secciones</h4>
            <ul>
              {[['#intro','Introducción'],['#temas','Temas'],['#reflexion','Reflexión'],['#tipos','Tipos de Comunicación'],['#evidencias','Evidencias'],['#equipo','Equipo'],['#aprend','Aprendizajes']].map(([h,l])=>(
                <li key={h}><a href={h}>{l}</a></li>
              ))}
            </ul>
          </div>
          <div className="ft-col">
            <h4>Programa</h4>
            <ul>
              {['ADSO · SENA','Ficha 3256502','Competencia Comunicaciones','Instructora: [Nombre]','Colombia · 2026'].map(t=>(
                <li key={t}><a href="#">{t}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="ft-bottom">
          <p>© 2026 · ADSO · SENA · Tecnología en Análisis y Desarrollo de Software</p>
          <p>Ficha 3256502 · Colombia</p>
        </div>
      </div>
    </footer>
  )
}

/* ─── APP ─── */
export default function App() {
  const [loaded, setLoaded] = useState(false)
  return (
    <>
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.5s ease' }}>
        <TopBar />
        <SideNav />
        <Hero />
        <Intro />
        <Temas />
        <Reflexion />
        <Tipos />
        <Evidencias />
        <Equipo />
        <Aprendizajes />
        <Footer />
      </div>
    </>
  )
}
