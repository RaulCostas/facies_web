const fs = require('fs');
let c = fs.readFileSync('protocolos_traducidos.md', 'utf8');

const newSection = `

## Manejo de Emergencia de la Obstrucción de la Vía Aérea por Cuerpo Extraño

<table style="border-collapse: separate; border-spacing: 70px 0; width: 100%; table-layout: fixed;">
<colgroup>
<col style="width: 42%">
<col style="width: 58%">
</colgroup>
<tr>
<td style="vertical-align: top; padding: 0;">
<table style="border-collapse: collapse; width: 100%;">
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.88em; background-color: #ffffff;">Obstrucción de la Vía Aérea por Cuerpo Extraño: Compromiso agudo de las vías respiratorias superiores secundario a la obstrucción por un cuerpo extraño</td></tr>
</table>
<br>
<table id="obstruccion-sintomas" style="border-collapse: collapse; width: 100%;">
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 1.05em; text-align: center; font-style: italic; background-color: #ffffff;">Síntomas</td></tr>
<tr><td style="border: 2px solid #000; padding: 8px; background-color: #f97316; font-size: 0.85em; line-height: 1.35;">
<strong>Asfixia</strong><br>
<strong>Estridor</strong><br>
<strong>Tos silenciosa</strong><br>
<strong>Incapacidad para hablar o respirar</strong>
</td></tr>
<tr><td style="border: 2px solid #000; padding: 8px; background-color: #ef4444; color: white; font-size: 0.85em; line-height: 1.35;">
<strong>Cianosis</strong><br>
<strong>Falta de respuesta</strong>
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
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #f97316;">Hipoxemia</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #ef4444; color: white;">Falta de respuesta</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #ef4444; color: white;">Paro cardiopulmonar</td></tr>
</table>
</td>
<td style="vertical-align: top; padding: 0;">
<table id="obstruccion-manejo" style="border-collapse: collapse; width: 100%;">
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 1.05em; text-align: center; font-style: italic; background-color: #ffffff;">Manejo de Emergencia de la<br>Obstrucción de la Vía Aérea por Cuerpo Extraño</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #f97316;">Detenga todos los procedimientos dentales</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #f97316;">Siente al paciente erguido</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; line-height: 1.35; background-color: #f97316;">Use el barrido digital solo si se ve un objeto al abrir la vía aérea para la RCP</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; line-height: 1.35; background-color: #f97316;">Intente aliviar una obstrucción solo si se desarrollan signos de obstrucción severa o si el paciente deja de responder</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #f97316;">Si el paciente responde: realice la maniobra de Heimlich</td></tr>
<tr><td style="border: 2px solid #000; padding: 8px; font-weight: bold; font-size: 0.85em; line-height: 1.4; background-color: #ef4444; color: white;">
Si el paciente no responde:<br>
&nbsp;&nbsp;&nbsp;Apoye al paciente en el suelo<br>
&nbsp;&nbsp;&nbsp;Inicie RCP<br>
&nbsp;&nbsp;&nbsp;Active inmediatamente el SEM (Servicio Médico de Emergencia)<br>
&nbsp;&nbsp;&nbsp;Transfiera a la Sala de Emergencias
</td></tr>
</table>
</td>
</tr>
</table>
`;

c += newSection;
fs.writeFileSync('protocolos_traducidos.md', c);
console.log('Foreign Body Airway Obstruction section appended!');
