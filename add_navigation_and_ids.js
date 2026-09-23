const fs = require('fs');

let c = fs.readFileSync('protocolos_traducidos.md', 'utf8');

// Map of heading to anchor ID
const headingsMap = [
  { old: '## Guía del Usuario', id: 'sec-guia-usuario', label: 'Guía del Usuario' },
  { old: '## Derechos de Autor y Descargo de Responsabilidad', id: 'sec-derechos-autor', label: 'Derechos de Autor' },
  { old: '## Tabla de Contenidos', id: 'sec-tabla-contenidos', label: 'Tabla de Contenidos' },
  { old: '## Rol de los Miembros del Equipo en Emergencia', id: 'sec-roles-equipo', label: 'Roles del Equipo' },
  { old: '## Equipo y Medicamentos de Emergencia', id: 'sec-equipo-farmacos', label: 'Equipo y Medicamentos' },
  { old: '## Paro Cardiopulmonar', id: 'sec-paro-cardiopulmonar', label: 'Paro Cardiopulmonar' },
  { old: '## Paro Cardiopulmonar: Protocolo de Fármacos', id: 'sec-paro-farmacos', label: 'Fármacos en Paro' },
  { old: '## Evaluación del Paciente con Dolor en el Pecho', id: 'sec-dolor-pecho', label: 'Dolor en el Pecho' },
  { old: '## Manejo de Emergencia de la Angina', id: 'sec-angina', label: 'Angina de Pecho' },
  { old: '## Manejo de Emergencia del Infarto de Miocardio en Evolución', id: 'sec-infarto', label: 'Infarto de Miocardio' },
  { old: '## Manejo de Emergencia de Sospecha de Embolia Pulmonar', id: 'sec-embolia-pulmonar', label: 'Embolia Pulmonar' },
  { old: '## Evaluación del Paciente con Falta de Aire', id: 'sec-falta-aire', label: 'Falta de Aire' },
  { old: '## Manejo de Emergencia de la Hiperventilación', id: 'sec-hiperventilacion', label: 'Hiperventilación' },
  { old: '## Manejo de Emergencia del Asma', id: 'sec-asma', label: 'Asma' },
  { old: '## Manejo de Emergencia de la Exacerbación Aguda de la EPOC', id: 'sec-epoc', label: 'EPOC' },
  { old: '## Manejo de Emergencia de la Insuficiencia Cardíaca Congestiva', id: 'sec-icc', label: 'Insuficiencia Cardíaca' },
  { old: '## Manejo de Emergencia de la Obstrucción de la Vía Aérea por Cuerpo Extraño', id: 'sec-obstruccion', label: 'Obstrucción Vía Aérea' },
  { old: '## Manejo de Emergencia de la Bradicardia', id: 'sec-bradicardia', label: 'Bradicardia' },
  { old: '## Manejo de Emergencia de la Taquicardia', id: 'sec-taquicardia', label: 'Taquicardia' },
  { old: '## Manejo de Emergencia de la Hipotensión', id: 'sec-hipotension', label: 'Hipotensión' },
  { old: '## Manejo de Emergencia de la Reacción Alérgica Leve', id: 'sec-alergia-leve', label: 'Alergia Leve' },
  { old: '## Manejo de Emergencia de la Reacción Alérgica Severa', id: 'sec-alergia-severa', label: 'Alergia Severa' },
  { old: '## Evaluación del Paciente con Alteración del Estado Mental', id: 'sec-estado-mental', label: 'Alteración Estado Mental' },
  { old: '## Evaluación del Paciente con Desmayo Simple (Síncope Vasovagal)', id: 'sec-desmayo-simple', label: 'Desmayo Simple' },
  { old: '## Evaluación del Paciente con Hipoglucemia', id: 'sec-hipoglucemia', label: 'Hipoglucemia' },
  { old: '## Evaluación del Paciente con Accidente Cerebrovascular', id: 'sec-acv', label: 'Accidente Cerebrovascular' },
  { old: '## Evaluación del Paciente con Convulsiones', id: 'sec-convulsiones', label: 'Convulsiones' }
];

// Replace headings with anchor span attached
headingsMap.forEach(item => {
  // Replace only exact heading line
  c = c.replace(item.old, `<div id="${item.id}" style="scroll-margin-top: 80px;"></div>\n\n${item.old}`);
});

// Create Buttons / Tabs Component HTML to place before Tabla de Contenidos
const navButtonsHtml = `

<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; margin: 24px 0 32px 0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
<div style="font-weight: bold; font-size: 1.15em; color: #1e293b; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
<span style="font-size: 1.3em;">📑</span> Acceso Rápido por Protocolo Clínico
</div>
<div style="font-size: 0.88em; color: #64748b; margin-bottom: 14px;">
Haz clic en cualquier pestaña o botón para desplazarte instantáneamente al protocolo de emergencia:
</div>

<div style="margin-bottom: 12px;">
<div style="font-size: 0.82em; font-weight: bold; color: #dc2626; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">❤️ Cardiovasculares y Paro</div>
<div style="display: flex; flex-wrap: wrap; gap: 6px;">
<a href="#sec-paro-cardiopulmonar" style="display: inline-block; padding: 6px 12px; background-color: #fee2e2; color: #991b1b; border: 1px solid #fca5a5; border-radius: 8px; font-size: 0.85em; font-weight: 600; text-decoration: none; transition: all 0.2s;">Paro Cardiopulmonar</a>
<a href="#sec-paro-farmacos" style="display: inline-block; padding: 6px 12px; background-color: #fee2e2; color: #991b1b; border: 1px solid #fca5a5; border-radius: 8px; font-size: 0.85em; font-weight: 600; text-decoration: none; transition: all 0.2s;">Fármacos en Paro</a>
<a href="#sec-dolor-pecho" style="display: inline-block; padding: 6px 12px; background-color: #fee2e2; color: #991b1b; border: 1px solid #fca5a5; border-radius: 8px; font-size: 0.85em; font-weight: 600; text-decoration: none; transition: all 0.2s;">Dolor en el Pecho</a>
<a href="#sec-angina" style="display: inline-block; padding: 6px 12px; background-color: #fee2e2; color: #991b1b; border: 1px solid #fca5a5; border-radius: 8px; font-size: 0.85em; font-weight: 600; text-decoration: none; transition: all 0.2s;">Angina</a>
<a href="#sec-infarto" style="display: inline-block; padding: 6px 12px; background-color: #fee2e2; color: #991b1b; border: 1px solid #fca5a5; border-radius: 8px; font-size: 0.85em; font-weight: 600; text-decoration: none; transition: all 0.2s;">Infarto (IAM)</a>
<a href="#sec-embolia-pulmonar" style="display: inline-block; padding: 6px 12px; background-color: #fee2e2; color: #991b1b; border: 1px solid #fca5a5; border-radius: 8px; font-size: 0.85em; font-weight: 600; text-decoration: none; transition: all 0.2s;">Embolia Pulmonar</a>
<a href="#sec-bradicardia" style="display: inline-block; padding: 6px 12px; background-color: #fee2e2; color: #991b1b; border: 1px solid #fca5a5; border-radius: 8px; font-size: 0.85em; font-weight: 600; text-decoration: none; transition: all 0.2s;">Bradicardia</a>
<a href="#sec-taquicardia" style="display: inline-block; padding: 6px 12px; background-color: #fee2e2; color: #991b1b; border: 1px solid #fca5a5; border-radius: 8px; font-size: 0.85em; font-weight: 600; text-decoration: none; transition: all 0.2s;">Taquicardia</a>
<a href="#sec-hipotension" style="display: inline-block; padding: 6px 12px; background-color: #fee2e2; color: #991b1b; border: 1px solid #fca5a5; border-radius: 8px; font-size: 0.85em; font-weight: 600; text-decoration: none; transition: all 0.2s;">Hipotensión</a>
</div>
</div>

<div style="margin-bottom: 12px;">
<div style="font-size: 0.82em; font-weight: bold; color: #0284c7; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">🫁 Respiratorias</div>
<div style="display: flex; flex-wrap: wrap; gap: 6px;">
<a href="#sec-falta-aire" style="display: inline-block; padding: 6px 12px; background-color: #e0f2fe; color: #0369a1; border: 1px solid #7dd3fc; border-radius: 8px; font-size: 0.85em; font-weight: 600; text-decoration: none; transition: all 0.2s;">Falta de Aire (Disnea)</a>
<a href="#sec-hiperventilacion" style="display: inline-block; padding: 6px 12px; background-color: #e0f2fe; color: #0369a1; border: 1px solid #7dd3fc; border-radius: 8px; font-size: 0.85em; font-weight: 600; text-decoration: none; transition: all 0.2s;">Hiperventilación</a>
<a href="#sec-asma" style="display: inline-block; padding: 6px 12px; background-color: #e0f2fe; color: #0369a1; border: 1px solid #7dd3fc; border-radius: 8px; font-size: 0.85em; font-weight: 600; text-decoration: none; transition: all 0.2s;">Asma</a>
<a href="#sec-epoc" style="display: inline-block; padding: 6px 12px; background-color: #e0f2fe; color: #0369a1; border: 1px solid #7dd3fc; border-radius: 8px; font-size: 0.85em; font-weight: 600; text-decoration: none; transition: all 0.2s;">EPOC</a>
<a href="#sec-icc" style="display: inline-block; padding: 6px 12px; background-color: #e0f2fe; color: #0369a1; border: 1px solid #7dd3fc; border-radius: 8px; font-size: 0.85em; font-weight: 600; text-decoration: none; transition: all 0.2s;">Insuficiencia Cardíaca</a>
<a href="#sec-obstruccion" style="display: inline-block; padding: 6px 12px; background-color: #e0f2fe; color: #0369a1; border: 1px solid #7dd3fc; border-radius: 8px; font-size: 0.85em; font-weight: 600; text-decoration: none; transition: all 0.2s;">Obstrucción Vía Aérea</a>
</div>
</div>

<div style="margin-bottom: 12px;">
<div style="font-size: 0.82em; font-weight: bold; color: #ea580c; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">⚠️ Alergias y Anafilaxia</div>
<div style="display: flex; flex-wrap: wrap; gap: 6px;">
<a href="#sec-alergia-leve" style="display: inline-block; padding: 6px 12px; background-color: #ffedd5; color: #c2410c; border: 1px solid #fdba74; border-radius: 8px; font-size: 0.85em; font-weight: 600; text-decoration: none; transition: all 0.2s;">Alergia Leve</a>
<a href="#sec-alergia-severa" style="display: inline-block; padding: 6px 12px; background-color: #ffedd5; color: #c2410c; border: 1px solid #fdba74; border-radius: 8px; font-size: 0.85em; font-weight: 600; text-decoration: none; transition: all 0.2s;">Alergia Severa (Anafilaxia)</a>
</div>
</div>

<div style="margin-bottom: 12px;">
<div style="font-size: 0.82em; font-weight: bold; color: #d97706; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">🧠 Alteración del Estado Mental</div>
<div style="display: flex; flex-wrap: wrap; gap: 6px;">
<a href="#sec-estado-mental" style="display: inline-block; padding: 6px 12px; background-color: #fef3c7; color: #b45309; border: 1px solid #fcd34d; border-radius: 8px; font-size: 0.85em; font-weight: 600; text-decoration: none; transition: all 0.2s;">Evaluación General</a>
<a href="#sec-desmayo-simple" style="display: inline-block; padding: 6px 12px; background-color: #fef3c7; color: #b45309; border: 1px solid #fcd34d; border-radius: 8px; font-size: 0.85em; font-weight: 600; text-decoration: none; transition: all 0.2s;">Desmayo Simple (Síncope)</a>
<a href="#sec-hipoglucemia" style="display: inline-block; padding: 6px 12px; background-color: #fef3c7; color: #b45309; border: 1px solid #fcd34d; border-radius: 8px; font-size: 0.85em; font-weight: 600; text-decoration: none; transition: all 0.2s;">Hipoglucemia</a>
<a href="#sec-acv" style="display: inline-block; padding: 6px 12px; background-color: #fef3c7; color: #b45309; border: 1px solid #fcd34d; border-radius: 8px; font-size: 0.85em; font-weight: 600; text-decoration: none; transition: all 0.2s;">Accidente Cerebrovascular</a>
<a href="#sec-convulsiones" style="display: inline-block; padding: 6px 12px; background-color: #fef3c7; color: #b45309; border: 1px solid #fcd34d; border-radius: 8px; font-size: 0.85em; font-weight: 600; text-decoration: none; transition: all 0.2s;">Convulsiones</a>
</div>
</div>

<div>
<div style="font-size: 0.82em; font-weight: bold; color: #475569; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">📋 Preparación General</div>
<div style="display: flex; flex-wrap: wrap; gap: 6px;">
<a href="#sec-roles-equipo" style="display: inline-block; padding: 6px 12px; background-color: #f1f5f9; color: #334155; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.85em; font-weight: 600; text-decoration: none; transition: all 0.2s;">Roles del Equipo</a>
<a href="#sec-equipo-farmacos" style="display: inline-block; padding: 6px 12px; background-color: #f1f5f9; color: #334155; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.85em; font-weight: 600; text-decoration: none; transition: all 0.2s;">Equipo y Fármacos</a>
</div>
</div>
</div>
`;

// Insert navButtonsHtml before '<div id="sec-tabla-contenidos"'
const targetMarker = '<div id="sec-tabla-contenidos"';
if (c.includes(targetMarker)) {
  c = c.replace(targetMarker, navButtonsHtml + '\n' + targetMarker);
}

fs.writeFileSync('protocolos_traducidos.md', c);
console.log('Navigation buttons and section anchor IDs inserted successfully!');
