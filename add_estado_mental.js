const fs = require('fs');
let c = fs.readFileSync('protocolos_traducidos.md', 'utf8');

const newSection = `

## Evaluación del Paciente con Alteración del Estado Mental

<table style="border-collapse: separate; border-spacing: 70px 0; width: 100%; table-layout: fixed;">
<colgroup>
<col style="width: 40%">
<col style="width: 60%">
</colgroup>
<tr>
<td style="vertical-align: top; padding: 0;">
<table id="mental-box" style="border-collapse: collapse; width: 100%;">
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 1.1em; text-align: center; font-style: italic; background-color: #ffffff;">Estado Mental Alterado</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.95em; font-style: italic; background-color: #84cc16;">1. Desmayo Simple (Síncope Vasovagal)</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.95em; font-style: italic; background-color: #facc15;">2. Trastorno Metabólico</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.95em; font-style: italic; background-color: #f97316;">3. Evento Neurológico</td></tr>
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
<strong>Coloque al paciente en una posición que minimice la aspiración:</strong> gire cuidadosamente al paciente sobre su lado izquierdo<br><br>
<strong>Vía aérea:</strong> Limpie la secreción de la cavidad oral<br>
&nbsp;&nbsp;&nbsp;Asegure la permeabilidad de la vía aérea<br><br>
<strong>Respiración:</strong> Asegúrese de que el paciente esté respirando normalmente<br><br>
<strong>Circulación:</strong> Asegúrese de que el paciente tenga una presión arterial y pulso razonables<br><br>
<strong>Medida Definitiva:</strong> según lo dicte la causa del estado mental alterado
</td></tr>
</table>
</td>
<td style="vertical-align: top; padding: 0;">
<div style="font-weight: bold; font-size: 1.1em; font-style: italic; margin-bottom: 6px;">1. Desmayo Simple (Síncope Vasovagal)</div>
<table id="mental-desmayo-target" style="border-collapse: collapse; width: 100%; margin-bottom: 16px;">
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.85em; line-height: 1.35; background-color: #84cc16;">
El paciente a menudo tiene un historial previo de desmayos al ver sangre<br>
El paciente a menudo tiene un pródromo con náuseas y sensación de desmayo<br>
El paciente a menudo está levemente bradicárdico al momento del desmayo simple<br>
El paciente a menudo está levemente hipotenso al momento del desmayo simple
</td></tr>
</table>

<div style="font-weight: bold; font-size: 1.1em; font-style: italic; margin-bottom: 6px;">2. Trastorno Metabólico</div>
<table id="mental-metabolico-target" style="border-collapse: collapse; width: 100%; margin-bottom: 16px;">
<tr>
<td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.88em; background-color: #facc15; width: 30%; vertical-align: top;">Hipoglucemia</td>
<td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.85em; line-height: 1.35; background-color: #facc15;">
El paciente suele ser diabético<br>
El paciente no tuvo una ingesta adecuada antes de la cita<br>
El paciente continuó con insulina normal o agentes hipoglucemiantes<br>
El paciente está tembloroso, ansioso, taquicárdico<br>
Agitación y confusión progresivas
</td>
</tr>
<tr>
<td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.88em; background-color: #ef4444; color: #ffffff;"></td>
<td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.85em; line-height: 1.35; background-color: #ef4444; color: #ffffff;">
<strong style="color: #ffffff;">Letargo<br>Convulsión</strong>
</td>
</tr>
</table>

<div style="font-weight: bold; font-size: 1.1em; font-style: italic; margin-bottom: 6px;">3. Evento Neurológico</div>
<table id="mental-neurologico-target" style="border-collapse: collapse; width: 100%;">
<tr>
<td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.88em; background-color: #f97316; width: 30%; vertical-align: top;">Accidente Cerebrovascular</td>
<td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.85em; line-height: 1.35; background-color: #f97316;">
El paciente tiene un inicio abrupto de déficit neurológico<br>
El déficit suele ser focal con pérdida de sensibilidad o función motora de extremidades o un lado del cuerpo<br>
El habla puede verse afectada
</td>
</tr>
<tr>
<td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.88em; background-color: #f97316; vertical-align: top;">Convulsión</td>
<td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.85em; line-height: 1.35; background-color: #f97316;">
El paciente suele tener antecedentes de convulsiones<br>
Espasmos focales que progresan a convulsiones tónico-clónicas<br>
El paciente suele despertarse lentamente después de la convulsión
</td>
</tr>
</table>
</td>
</tr>
</table>
`;

c += newSection;
fs.writeFileSync('protocolos_traducidos.md', c);
console.log('Change in Mental Status evaluation section appended!');
