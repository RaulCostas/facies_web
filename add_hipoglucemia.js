const fs = require('fs');
let c = fs.readFileSync('protocolos_traducidos.md', 'utf8');

const newSection = `

## Evaluación del Paciente con Hipoglucemia

<table style="border-collapse: separate; border-spacing: 70px 0; width: 100%; table-layout: fixed;">
<colgroup>
<col style="width: 44%">
<col style="width: 56%">
</colgroup>
<tr>
<td style="vertical-align: top; padding: 0;">
<table style="border-collapse: collapse; width: 100%;">
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 1.05em; text-align: center; font-style: italic; background-color: #ffffff;">Estado Mental Alterado</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.95em; font-style: italic; background-color: #facc15;">Hipoglucemia</td></tr>
</table>

<div style="display: flex; justify-content: center; margin: 8px 0;">
<svg width="20" height="38" viewBox="0 0 20 38">
<line x1="10" y1="0" x2="10" y2="26" stroke="black" stroke-width="3"/>
<polygon points="3,24 10,36 17,24" fill="black"/>
</svg>
</div>

<table id="hipoglucemia-caract-box" style="border-collapse: collapse; width: 100%;">
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 1.05em; text-align: center; font-style: italic; background-color: #ffffff;">Hipoglucemia</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.85em; line-height: 1.35; background-color: #facc15;">El paciente suele ser diabético (&gt;90% de las veces) con ingesta oral comprometida</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.85em; line-height: 1.35; background-color: #facc15;">El paciente se quejaría de nerviosismo, ansiedad y sensación de fatalidad inminente</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.85em; line-height: 1.35; background-color: #facc15;">El paciente estaría taquicárdico, diaforético y tembloroso</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.85em; line-height: 1.35; background-color: #facc15;">El paciente no tiene compromiso de la vía aérea o la respiración</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.85em; line-height: 1.35; background-color: #facc15;">El paciente no tiene la circulación comprometida</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.85em; line-height: 1.35; background-color: #f97316;">El paciente inicialmente estaría alerta pero se volvería progresivamente agitado, confundido, letárgico y finalmente inconsciente</td></tr>
</table>
</td>

<td style="vertical-align: top; padding: 0;">
<table id="hipoglucemia-interv-box" style="border-collapse: collapse; width: 100%;">
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 1.05em; text-align: center; font-style: italic; background-color: #ffffff;">Intervenciones Inmediatas</td></tr>
<tr><td style="border: 2px solid #000; padding: 8px; font-size: 0.88em; line-height: 1.4;">
<strong>Detenga todos los procedimientos dentales</strong><br><br>
<strong>Retire los instrumentos del campo</strong><br><br>
<strong>Coloque al paciente en una posición que minimice la aspiración:</strong> gire cuidadosamente al paciente sobre su lado izquierdo<br><br>
<strong>Vía aérea:</strong> Limpie la secreción de la cavidad oral<br>
&nbsp;&nbsp;&nbsp;Asegure la permeabilidad de la vía aérea<br><br>
<strong>Respiración:</strong> Asegúrese de que el paciente esté respirando normalmente<br><br>
<strong>Circulación:</strong> Asegúrese de que el paciente tenga una presión arterial y pulso razonables
</td></tr>
</table>

<div style="display: flex; justify-content: center; margin: 8px 0;">
<svg width="20" height="38" viewBox="0 0 20 38">
<line x1="10" y1="0" x2="10" y2="26" stroke="black" stroke-width="3"/>
<polygon points="3,24 10,36 17,24" fill="black"/>
</svg>
</div>

<table id="hipoglucemia-definitivas-box" style="border-collapse: collapse; width: 100%;">
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 1.05em; text-align: center; font-style: italic; background-color: #ffffff;">Medidas Definitivas</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.85em; line-height: 1.35; background-color: #facc15;">Si el paciente está consciente, administre 4 oz de jugo de naranja o refresco de cola cada 5 minutos x 3</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.85em; line-height: 1.35; background-color: #f97316;">Si el paciente está inconsciente, aplique Gluco-Gel en la superficie gingival</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.85em; line-height: 1.35; background-color: #f97316;">El paciente debe recuperar el conocimiento en cuestión de minutos</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.85em; line-height: 1.35; background-color: #ef4444; color: #ffffff;">Si el paciente no recupera el conocimiento en unos pocos minutos, considere otras causas de estado mental alterado</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.85em; line-height: 1.35; background-color: #ef4444; color: #ffffff;">Inicie IV, si está capacitado: infunda 50 cc de D<sub>50</sub>W</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.85em; line-height: 1.35; background-color: #ef4444; color: #ffffff;">Transfiera a ER</td></tr>
</table>
</td>
</tr>
</table>
`;

c += newSection;
fs.writeFileSync('protocolos_traducidos.md', c);
console.log('Hypoglycemia section appended!');
