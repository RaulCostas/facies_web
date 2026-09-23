const fs = require('fs');
let c = fs.readFileSync('protocolos_traducidos.md', 'utf8');

const newSection = `

## Manejo de Emergencia de la Insuficiencia Cardíaca Congestiva

<table style="border-collapse: separate; border-spacing: 70px 0; width: 100%; table-layout: fixed;">
<colgroup>
<col style="width: 42%">
<col style="width: 58%">
</colgroup>
<tr>
<td style="vertical-align: top; padding: 0;">
<table style="border-collapse: collapse; width: 100%;">
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.88em; background-color: #ffffff;">Insuficiencia cardíaca congestiva: Incapacidad del corazón para suministrar una cantidad adecuada de sangre oxigenada para satisfacer las demandas metabólicas del cuerpo, resultando en insuficiencia del corazón izquierdo y congestión pulmonar</td></tr>
</table>
<br>
<table id="icc-sintomas" style="border-collapse: collapse; width: 100%;">
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 1.05em; text-align: center; font-style: italic; background-color: #ffffff;">Síntomas</td></tr>
<tr><td style="border: 2px solid #000; padding: 8px; background-color: #f97316; font-size: 0.85em; line-height: 1.35;">
<strong>El paciente a menudo tiene un historial de insuficiencia cardíaca congestiva</strong><br>
<strong>El paciente desarrolla falta de aire aguda</strong><br>
<strong>El paciente suena "burbujeante"</strong><br>
<strong>El paciente prefiere sentarse erguido</strong>
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
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #ef4444; color: white;">Precipitación de un infarto de miocardio</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #ef4444; color: white;">Arritmia</td></tr>
</table>
</td>
<td style="vertical-align: top; padding: 0;">
<table id="icc-manejo" style="border-collapse: collapse; width: 100%;">
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 1.05em; text-align: center; font-style: italic; background-color: #ffffff;">Manejo de Emergencia de la<br>Insuficiencia Cardíaca Congestiva</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #f97316;">Detenga todos los procedimientos dentales</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #f97316;">Siente al paciente erguido</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; line-height: 1.35; background-color: #f97316;">Administre spray o tableta de nitroglicerina sublingual (0.3 mg)<br>Use la nitroglicerina del paciente, asegurándose de que no haya caducado</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #f97316;">Administre oxígeno</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #f97316;">Monitoree la presión arterial y el pulso</td></tr>
<tr><td style="border: 2px solid #000; padding: 8px; font-weight: bold; font-size: 0.85em; line-height: 1.4; background-color: #ef4444; color: white;">
Si los síntomas no se resuelven en 5 minutos:<br>
&nbsp;&nbsp;&nbsp;Administre una <span style="color: #93c5fd; font-weight: bold;">segunda dosis de nitroglicerina</span><br>
&nbsp;&nbsp;&nbsp;Inicie IV<br>
&nbsp;&nbsp;&nbsp;Llame al 911 para activar el Servicio Médico de Emergencia<br>
&nbsp;&nbsp;&nbsp;Transfiera al paciente a la Sala de Emergencias
</td></tr>
</table>
</td>
</tr>
</table>
`;

c += newSection;
fs.writeFileSync('protocolos_traducidos.md', c);
console.log('Congestive Heart Failure section appended!');
