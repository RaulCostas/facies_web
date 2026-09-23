const fs = require('fs');
let c = fs.readFileSync('protocolos_traducidos.md', 'utf8');

const newSection = `

## Evaluación del Paciente con Accidente Cerebrovascular

<table style="border-collapse: separate; border-spacing: 70px 0; width: 100%; table-layout: fixed;">
<colgroup>
<col style="width: 44%">
<col style="width: 56%">
</colgroup>
<tr>
<td style="vertical-align: top; padding: 0;">
<table style="border-collapse: collapse; width: 100%;">
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 1.05em; text-align: center; font-style: italic; background-color: #ffffff;">Estado Mental Alterado</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.95em; font-style: italic; background-color: #f97316;">Accidente Cerebrovascular</td></tr>
</table>

<div style="display: flex; justify-content: center; margin: 8px 0;">
<svg width="20" height="38" viewBox="0 0 20 38">
<line x1="10" y1="0" x2="10" y2="26" stroke="black" stroke-width="3"/>
<polygon points="3,24 10,36 17,24" fill="black"/>
</svg>
</div>

<table id="acv-caract-box" style="border-collapse: collapse; width: 100%;">
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 1.05em; text-align: center; font-style: italic; background-color: #ffffff;">Accidente Cerebrovascular<br>(Ictus / ACV)</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.85em; line-height: 1.35; background-color: #f97316;">El paciente suele ser mayor</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.85em; line-height: 1.35; background-color: #f97316;">El paciente a menudo tiene antecedentes de enfermedad vascular (enfermedad de las arterias coronarias, hipertensión, enfermedad vascular periférica)</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.85em; line-height: 1.35; background-color: #f97316;">El paciente desarrollaría abruptamente déficits neurológicos focales (debilidad o entumecimiento en un lado del cuerpo; déficits del habla)</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.85em; line-height: 1.35; background-color: #f97316;">El estado mental no suele estar comprometido al inicio, pero puede comprometerse progresivamente</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.85em; line-height: 1.35; background-color: #ef4444; color: #ffffff;">El paciente con un accidente cerebrovascular hemorrágico se queja de dolor de cabeza severo</td></tr>
</table>
</td>

<td style="vertical-align: top; padding: 0;">
<table id="acv-interv-box" style="border-collapse: collapse; width: 100%;">
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
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.85em; line-height: 1.35; background-color: #f97316;">Cuidados de apoyo; monitoree los signos vitales</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.85em; line-height: 1.35; background-color: #f97316;">Administre oxígeno</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.85em; line-height: 1.35; background-color: #f97316;">Inicie IV</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.85em; line-height: 1.35; background-color: #f97316;">Transfiera a ER tan pronto como sea posible</td></tr>
</table>
</td>
</tr>
</table>
`;

c += newSection;
fs.writeFileSync('protocolos_traducidos.md', c);
console.log('Cerebrovascular Accident section appended!');
