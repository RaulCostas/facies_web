const fs = require('fs');
let c = fs.readFileSync('protocolos_traducidos.md', 'utf8');

const idx = c.indexOf('## Evaluación del Paciente con Falta de Aire');
const nextIdx = c.indexOf('\n## ', idx + 1);

const newSection = `## Evaluación del Paciente con Falta de Aire

<table style="border-collapse: separate; border-spacing: 70px 0; width: 100%; table-layout: fixed;">
<colgroup>
<col style="width: 40%">
<col style="width: 60%">
</colgroup>
<tr>
<td style="vertical-align: top; padding: 0;">
<table id="falta-aire-box" style="border-collapse: collapse; width: 100%;">
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 1.1em; text-align: center; font-style: italic; background-color: #ffffff;">Falta de Aire</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.95em; font-style: italic; background-color: #84cc16;">1. Hiperventilación</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.95em; font-style: italic; background-color: #facc15;">2. Causas Pulmonares</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.95em; font-style: italic; background-color: #f97316;">3. Causas Cardíacas</td></tr>
</table>
<div style="display: flex; justify-content: center; margin: 8px 0;">
<svg width="20" height="38" viewBox="0 0 20 38">
<line x1="10" y1="0" x2="10" y2="26" stroke="black" stroke-width="3"/>
<polygon points="3,24 10,36 17,24" fill="black"/>
</svg>
</div>
<table style="border-collapse: collapse; width: 100%;">
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 1.05em; text-align: center; font-style: italic; background-color: #ffffff;">Intervención Inmediata</td></tr>
<tr><td style="border: 2px solid #000; padding: 8px; font-size: 0.88em; line-height: 1.4;">
<strong>Detenga todos los procedimientos dentales</strong><br><br>
<strong>Retire los instrumentos del campo</strong><br><br>
<strong>Ponga al paciente en una posición cómoda</strong><br><br>
<strong>¿El paciente parece ansioso?</strong><br><br>
<strong>¿El paciente tiene problemas previos con falta de aire?</strong><br><br>
<strong>¿El paciente tiene dolor en el pecho asociado?</strong><br><br>
<strong>¿El paciente tiene un historial de enfermedad pulmonar (asma, EPOC)?</strong><br><br>
<strong>¿El paciente aspiró?</strong><br><br>
<strong>¿El paciente tiene un historial de enfermedad cardíaca (insuficiencia cardíaca congestiva)?</strong>
</td></tr>
</table>
</td>
<td style="vertical-align: top; padding: 0;">
<div style="font-weight: bold; font-size: 1.1em; font-style: italic; margin-bottom: 6px;">1. Hiperventilación</div>
<table id="falta-hiperventilacion-target" style="border-collapse: collapse; width: 100%; margin-bottom: 16px;">
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.85em; line-height: 1.35; background-color: #84cc16;">
El paciente parece ansioso<br>
No hay signos de hipoxemia<br>
Los síntomas se resuelven a medida que disminuye el nivel de ansiedad
</td></tr>
</table>
<div style="font-weight: bold; font-size: 1.1em; font-style: italic; margin-bottom: 6px;">2. Causas Pulmonares</div>
<table id="falta-pulmonares-target" style="border-collapse: collapse; width: 100%; margin-bottom: 16px;">
<tr>
<td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.88em; background-color: #facc15; width: 35%;">Asma</td>
<td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.85em; line-height: 1.35; background-color: #facc15;">El paciente generalmente da un historial de asma<br>Sibilancias escuchadas durante la espiración<br>El paciente prefiere sentarse derecho</td>
</tr>
<tr>
<td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.88em; background-color: #f97316;">Exacerbación de enfermedad pulmonar obstructiva crónica</td>
<td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.85em; line-height: 1.35; background-color: #f97316;">El paciente tiene un historial de EPOC<br>Sibilancias y roncus escuchados durante la inspiración y espiración<br>El paciente prefiere sentarse derecho</td>
</tr>
<tr>
<td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.88em; background-color: #facc15;">Neumonía</td>
<td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.85em; line-height: 1.35; background-color: #facc15;">Poco probable que se presente agudamente durante un procedimiento dental</td>
</tr>
<tr>
<td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.88em; background-color: #ef4444; color: white;">Embolia pulmonar</td>
<td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.85em; line-height: 1.35; background-color: #ef4444; color: white;">Inicio abrupto de dolor en el pecho pleurítico<br>Puede tener evidencia de hipoxemia</td>
</tr>
<tr>
<td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.88em; background-color: #f97316;">Obstrucción de Vía Aérea por Cuerpo Extraño</td>
<td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.85em; line-height: 1.35; background-color: #f97316;">Inicio abrupto de asfixia en el contexto de aspiración de un cuerpo extraño</td>
</tr>
</table>
<div style="font-weight: bold; font-size: 1.1em; font-style: italic; margin-bottom: 6px;">3. Causas Cardíacas</div>
<table id="falta-cardiacas-target" style="border-collapse: collapse; width: 100%;">
<tr>
<td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.88em; background-color: #ef4444; color: white; width: 35%;">Insuficiencia Cardíaca Congestiva</td>
<td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.85em; line-height: 1.35; background-color: #ef4444; color: white;">El paciente a menudo tiene un historial de insuficiencia cardíaca congestiva<br>El paciente tiene exacerbación de la dificultad para respirar en posición supina<br>El paciente suena "burbujeante"<br>El paciente parece hipóxico</td>
</tr>
</table>
</td>
</tr>
</table>

`;

c = nextIdx !== -1 
  ? c.slice(0, idx) + newSection + c.slice(nextIdx)
  : c.slice(0, idx) + newSection;
fs.writeFileSync('protocolos_traducidos.md', c);
console.log('Shortness of Breath evaluation section updated!');
