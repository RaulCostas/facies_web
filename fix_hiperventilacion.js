const fs = require('fs');
let c = fs.readFileSync('protocolos_traducidos.md', 'utf8');

const idx = c.indexOf('## Manejo de Emergencia de la Hiperventilación');
const nextIdx = c.indexOf('\n## ', idx + 1);

const newSection = `## Manejo de Emergencia de la Hiperventilación

<table style="border-collapse: separate; border-spacing: 70px 0; width: 100%; table-layout: fixed;">
<colgroup>
<col style="width: 42%">
<col style="width: 58%">
</colgroup>
<tr>
<td style="vertical-align: top; padding: 0;">
<table style="border-collapse: collapse; width: 100%;">
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.88em; background-color: #ffffff;">Hiperventilación: ventilación excesivamente rápida debido a la ansiedad</td></tr>
</table>
<br>
<table id="hiperventilacion-sintomas" style="border-collapse: collapse; width: 100%;">
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 1.05em; text-align: center; font-style: italic; background-color: #ffffff;">Síntomas</td></tr>
<tr><td style="border: 2px solid #000; padding: 8px; background-color: #84cc16; font-size: 0.85em; line-height: 1.35;">
<strong>Sensación de falta de aire</strong><br>
<strong>Mareos, aturdimiento</strong><br>
<strong>Entumecimiento y hormigueo alrededor de la boca o en los dedos</strong><br>
<strong>Ansiedad significativa</strong><br>
<strong>Sin evidencia de hipoxemia</strong><br>
<strong>Sin evidencia de compromiso de las vías respiratorias</strong><br>
<strong>Sin evidencia de sibilancias</strong>
</td></tr>
</table>
<div style="display: flex; justify-content: center; margin: 8px 0;">
<svg width="20" height="38" viewBox="0 0 20 38">
<line x1="10" y1="0" x2="10" y2="26" stroke="black" stroke-width="3"/>
<polygon points="3,24 10,36 17,24" fill="black"/>
</svg>
</div>
<table style="border-collapse: collapse; width: 100%;">
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 1.05em; text-align: center; font-style: italic; background-color: #ffffff;">Complicaciones</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #f97316;">Alcalosis respiratoria</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #f97316;">Raramente arritmia</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #f97316;">Otras causas que imitan la hiperventilación</td></tr>
</table>
</td>
<td style="vertical-align: top; padding: 0;">
<table id="hiperventilacion-manejo" style="border-collapse: collapse; width: 100%;">
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 1.05em; text-align: center; font-style: italic; background-color: #ffffff;">Manejo de Emergencia de la<br>Hiperventilación</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #84cc16;">Detenga todos los procedimientos dentales</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #84cc16;">Tranquilice al paciente</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #84cc16;">Pida al paciente que respire lenta y profundamente</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #84cc16;">Re-respirar mediante una bolsa de papel no se recomienda</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #84cc16;">Monitoree la presión arterial y el pulso</td></tr>
<tr><td style="border: 2px solid #000; padding: 8px; font-weight: bold; font-size: 0.85em; line-height: 1.4; background-color: #f97316;">
Si los síntomas son refractarios al tratamiento inicial:<br>
&nbsp;&nbsp;&nbsp;Considere otras causas de falta de aire<br>
&nbsp;&nbsp;&nbsp;Revise el algoritmo para determinar otras causas de falta de aire
</td></tr>
</table>
</td>
</tr>
</table>

`;

c = nextIdx !== -1 
  ? c.slice(0, idx) + newSection + c.slice(nextIdx)
  : c.slice(0, idx) + newSection;
fs.writeFileSync('protocolos_traducidos.md', c);
console.log('Hyperventilation section updated!');
