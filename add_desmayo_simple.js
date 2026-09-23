const fs = require('fs');
let c = fs.readFileSync('protocolos_traducidos.md', 'utf8');

const newSection = `

## Evaluación del Paciente con Desmayo Simple (Síncope Vasovagal)

<table style="border-collapse: separate; border-spacing: 70px 0; width: 100%; table-layout: fixed;">
<colgroup>
<col style="width: 44%">
<col style="width: 56%">
</colgroup>
<tr>
<td style="vertical-align: top; padding: 0;">
<table style="border-collapse: collapse; width: 100%;">
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 1.05em; text-align: center; font-style: italic; background-color: #ffffff;">Estado Mental Alterado</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.95em; font-style: italic; background-color: #84cc16;">Desmayo Simple (Síncope Vasovagal)</td></tr>
</table>

<div style="display: flex; justify-content: center; margin: 8px 0;">
<svg width="20" height="38" viewBox="0 0 20 38">
<line x1="10" y1="0" x2="10" y2="26" stroke="black" stroke-width="3"/>
<polygon points="3,24 10,36 17,24" fill="black"/>
</svg>
</div>

<table id="desmayo-caract-box" style="border-collapse: collapse; width: 100%;">
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 1.05em; text-align: center; font-style: italic; background-color: #ffffff;">Desmayo Simple<br>(Síncope Vasovagal)</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.85em; line-height: 1.35; background-color: #84cc16;">El paciente a menudo tiene antecedentes de desmayos al ver sangre</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.85em; line-height: 1.35; background-color: #84cc16;">El paciente a menudo tiene un pródromo con náuseas y sensación de desmayo</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.85em; line-height: 1.35; background-color: #84cc16;">El paciente suele estar levemente bradicárdico al momento del desmayo, pero no está hemodinámicamente comprometido</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.85em; line-height: 1.35; background-color: #84cc16;">El paciente puede estar levemente hipotenso al momento del desmayo, pero no está hemodinámicamente comprometido</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.85em; line-height: 1.35; background-color: #84cc16;">La vía aérea y la respiración no están comprometidas</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.85em; line-height: 1.35; background-color: #84cc16;">La circulación no está comprometida</td></tr>
</table>
</td>

<td style="vertical-align: top; padding: 0;">
<table id="desmayo-interv-box" style="border-collapse: collapse; width: 100%;">
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

<table style="border-collapse: collapse; width: 100%;">
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 1.05em; text-align: center; font-style: italic; background-color: #ffffff;">Medidas Definitivas</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.9em; background-color: #84cc16;">Manejo conservador</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.85em; line-height: 1.35; background-color: #84cc16;">El paciente debe recuperar el conocimiento en cuestión de minutos</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.85em; line-height: 1.35; background-color: #ef4444; color: #ffffff;">Si el paciente no recupera el conocimiento con prontitud, considere otras etiologías de estado mental alterado</td></tr>
</table>
</td>
</tr>
</table>
`;

c += newSection;
fs.writeFileSync('protocolos_traducidos.md', c);
console.log('Simple Faint section appended!');
