const fs = require('fs');
let c = fs.readFileSync('protocolos_traducidos.md', 'utf8');

const idx = c.indexOf('## Manejo de Emergencia de la Angina');
const nextIdx = c.indexOf('\n## ', idx + 1);

const newSection = `## Manejo de Emergencia de la Angina

<table style="border-collapse: separate; border-spacing: 70px 0; width: 100%; table-layout: fixed;">
<colgroup>
<col style="width: 42%">
<col style="width: 58%">
</colgroup>
<tr>
<td style="vertical-align: top; padding: 0;">
<table style="border-collapse: collapse; width: 100%;">
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.88em; background-color: #ffffff;">Angina: dolor en el pecho como resultado de que la demanda miocárdica supera el suministro de oxígeno al corazón</td></tr>
</table>
<br>
<table id="angina-sintomas" style="border-collapse: collapse; width: 100%;">
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 1.05em; text-align: center; font-style: italic; background-color: #ffffff;">Síntomas</td></tr>
<tr><td style="border: 2px solid #000; padding: 8px; background-color: #f97316; font-size: 0.85em; line-height: 1.35;">
<strong>Dolor de pecho subesternal con irradiación a la mandíbula y el aspecto medial del brazo izquierdo</strong><br>
<strong>El dolor se describe a menudo como una sensación de compresión o pesadez</strong><br>
<strong>Los síntomas son precipitados por el estrés y a menudo se autolimitan</strong>
</td></tr>
</table>
<div style="display: flex; justify-content: center; margin: 8px 0;">
<svg width="20" height="38" viewBox="0 0 20 38">
<line x1="10" y1="0" x2="10" y2="26" stroke="black" stroke-width="3"/>
<polygon points="3,24 10,36 17,24" fill="black"/>
</svg>
</div>
<table style="border-collapse: collapse; width: 100%;">
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 1.05em; text-align: center; font-style: italic; background-color: #ffffff;">Complicaciones de la Angina</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #ef4444; color: white;">Progresión a infarto de miocardio</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #ef4444; color: white;">Arritmia</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #f97316;">Insuficiencia cardíaca congestiva</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #f97316;">Enfermedad del sistema de conducción y bloqueo cardíaco</td></tr>
</table>
</td>
<td style="vertical-align: top; padding: 0;">
<table id="angina-manejo" style="border-collapse: collapse; width: 100%;">
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 1.05em; text-align: center; font-style: italic; background-color: #ffffff;">Manejo de Emergencia de la Angina</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #f97316;">Detenga todos los procedimientos dentales</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; line-height: 1.35; background-color: #f97316;">Administre spray o tableta de nitroglicerina sublingual (0.3 mg)<br>Use la nitroglicerina del paciente, asegurándose de que no haya caducado</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #f97316;">Administre oxígeno</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #f97316;">Monitoree la presión arterial y el pulso</td></tr>
<tr><td style="border: 2px solid #000; padding: 8px; font-weight: bold; font-size: 0.85em; line-height: 1.4; background-color: #ef4444; color: white;">
Si el dolor no se alivia después de 5 minutos:<br>
&nbsp;&nbsp;&nbsp;Dé una segunda nitroglicerina<br>
&nbsp;&nbsp;&nbsp;Pida al paciente que mastique 325 mg de aspirina<br>
&nbsp;&nbsp;&nbsp;Inicie acceso IV y<br>
&nbsp;&nbsp;&nbsp;Transfiera al paciente a la Sala de Emergencias
</td></tr>
</table>
</td>
</tr>
</table>

`;

c = c.slice(0, idx) + newSection + c.slice(nextIdx);
fs.writeFileSync('protocolos_traducidos.md', c);
console.log('Angina emergency management section updated!');
