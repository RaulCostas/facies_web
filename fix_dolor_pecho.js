const fs = require('fs');
let c = fs.readFileSync('protocolos_traducidos.md', 'utf8');

const idx = c.indexOf('## Evaluación del Paciente con Dolor en el Pecho');
const nextIdx = c.indexOf('\n## ', idx + 1);

const newSection = `## Evaluación del Paciente con Dolor en el Pecho

<table style="border-collapse: separate; border-spacing: 70px 0; width: 100%; table-layout: fixed;">
<colgroup>
<col style="width: 40%">
<col style="width: 60%">
</colgroup>
<tr>
<td style="vertical-align: top; padding: 0;">
<table id="dolor-pecho-box" style="border-collapse: collapse; width: 100%;">
<tr><td style="border: 2px solid #000; background-color: #f8fafc; padding: 8px; font-weight: bold; font-size: 1.1em; text-align: center;">Dolor en el Pecho</td></tr>
<tr><td style="border: 2px solid #000; background-color: #f97316; padding: 8px; font-weight: bold; font-size: 1.05em; font-style: italic;">1. Dolor Cardíaco</td></tr>
<tr><td style="border: 2px solid #000; background-color: #eab308; padding: 8px; font-weight: bold; font-size: 1.05em; font-style: italic;">2. Dolor No Cardíaco</td></tr>
</table>
<div style="display: flex; justify-content: center; margin: 8px 0;">
<svg width="20" height="38" viewBox="0 0 20 38">
<line x1="10" y1="0" x2="10" y2="26" stroke="black" stroke-width="3"/>
<polygon points="3,24 10,36 17,24" fill="black"/>
</svg>
</div>
<table style="border-collapse: collapse; width: 100%;">
<tr><td style="border: 2px solid #000; padding: 8px; font-weight: bold; font-size: 1.05em; text-align: center; font-style: italic;">Intervención Inmediata</td></tr>
<tr><td style="border: 2px solid #000; padding: 8px; font-size: 0.88em; line-height: 1.4;">
<strong>Detenga todos los procedimientos dentales</strong><br><br>
<strong>Retire los instrumentos del campo</strong><br><br>
<strong>Pregunte al paciente si hay un historial de dolor en el pecho similar</strong><br><br>
<strong>Pregunte al paciente sobre la naturaleza del dolor</strong><br><br>
<strong>Pregunte al paciente sobre la severidad del dolor (en una escala de uno a diez)</strong><br><br>
<strong>Pregunte si el dolor se agrava con el movimiento</strong><br><br>
<strong>Pregunte al paciente sobre la irradiación del dolor</strong><br>
&nbsp;&nbsp;&nbsp;? irradiación a la mandíbula<br>
&nbsp;&nbsp;&nbsp;? irradiación al hombro<br><br>
<strong>Pregunte al paciente sobre los medicamentos normalmente tomados para el dolor de pecho</strong>
</td></tr>
</table>
</td>
<td style="vertical-align: top; padding: 0;">
<div style="font-weight: bold; font-size: 1.15em; font-style: italic; margin-bottom: 6px;">1. Dolor Cardíaco</div>
<table id="dolor-cardiaco-target" style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
<tr>
<td style="border: 2px solid #000; background-color: #f97316; padding: 6px 8px; font-weight: bold; width: 30%; font-size: 0.88em;">Angina</td>
<td style="border: 2px solid #000; background-color: #f97316; padding: 6px 8px; font-size: 0.85em; line-height: 1.35;">Sensación de pesadez o compresión de dolor en el área retroesternal con irradiación a la mandíbula, el hombro izquierdo o la cara interna del brazo izquierdo</td>
</tr>
<tr>
<td style="border: 2px solid #000; background-color: #ef4444; color: white; padding: 6px 8px; font-weight: bold; font-size: 0.88em;">Infarto de Miocardio</td>
<td style="border: 2px solid #000; background-color: #ef4444; color: white; padding: 6px 8px; font-size: 0.85em; line-height: 1.35;">Dolor de pecho severo, aplastante en el área subesternal o precordial con irradiación a la mandíbula o brazo izquierdo<br>Los síntomas son más severos y más prolongados que la angina<br>El paciente a menudo aparece pálido, diaforético y se queja de náuseas</td>
</tr>
<tr>
<td style="border: 2px solid #000; background-color: #eab308; padding: 6px 8px; font-weight: bold; font-size: 0.88em;">Pericarditis</td>
<td style="border: 2px solid #000; background-color: #eab308; padding: 6px 8px; font-size: 0.85em; line-height: 1.35;">Dolor debido a la inflamación del revestimiento del corazón<br>Dolor de pecho subesternal agudo, a menudo agravado al tragar y aliviado al sentarse hacia adelante</td>
</tr>
</table>
<div style="font-weight: bold; font-size: 1.15em; font-style: italic; margin-bottom: 6px;">2. Dolor No Cardíaco</div>
<table id="dolor-no-cardiaco-target" style="border-collapse: collapse; width: 100%;">
<tr>
<td style="border: 2px solid #000; background-color: #f8fafc; padding: 6px 8px; font-weight: bold; width: 30%; font-size: 0.88em;">Musculoesquelético</td>
<td style="border: 2px solid #000; background-color: #f8fafc; padding: 6px 8px; font-size: 0.85em; line-height: 1.35;">Dolor leve no específico<br>El dolor a menudo se agrava por el movimiento</td>
</tr>
<tr>
<td style="border: 2px solid #000; background-color: #eab308; padding: 6px 8px; font-weight: bold; font-size: 0.88em;">Pleuritis</td>
<td style="border: 2px solid #000; background-color: #eab308; padding: 6px 8px; font-size: 0.85em; line-height: 1.35;">Dolor debido a la inflamación del revestimiento del pulmón<br>El dolor se acentúa por el movimiento respiratorio y es peor durante la inspiración (dolor de pecho pleurítico)</td>
</tr>
<tr>
<td style="border: 2px solid #000; background-color: #f97316; padding: 6px 8px; font-weight: bold; font-size: 0.88em;">Embolia Pulmonar</td>
<td style="border: 2px solid #000; background-color: #f97316; padding: 6px 8px; font-size: 0.85em; line-height: 1.35;">El dolor es pleurítico<br>El paciente tiene falta de aire</td>
</tr>
<tr>
<td style="border: 2px solid #000; background-color: #eab308; padding: 6px 8px; font-weight: bold; font-size: 0.88em;">Reflujo Gastroesofágico</td>
<td style="border: 2px solid #000; background-color: #eab308; padding: 6px 8px; font-size: 0.85em; line-height: 1.35;">Dolor debido al reflujo de ácido del estómago al esófago<br>Generalmente se describe como un dolor punzante<br>Generalmente no se irradia</td>
</tr>
</table>
</td>
</tr>
</table>

`;

c = c.slice(0, idx) + newSection + c.slice(nextIdx);
fs.writeFileSync('protocolos_traducidos.md', c);
console.log('Chest Pain evaluation section updated!');
