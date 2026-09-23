const fs = require('fs');
let c = fs.readFileSync('protocolos_traducidos.md', 'utf8');

const newSection = `

## Manejo de Emergencia de la Exacerbación Aguda de la EPOC

<table style="border-collapse: separate; border-spacing: 70px 0; width: 100%; table-layout: fixed;">
<colgroup>
<col style="width: 42%">
<col style="width: 58%">
</colgroup>
<tr>
<td style="vertical-align: top; padding: 0;">
<table style="border-collapse: collapse; width: 100%;">
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.88em; background-color: #ffffff;">Enfermedad Pulmonar Obstructiva Crónica (EPOC): enfermedad debida a afección persistente de las vías respiratorias<br>El paciente puede tener bronquitis crónica o enfisema</td></tr>
</table>
<br>
<table id="epoc-sintomas" style="border-collapse: collapse; width: 100%;">
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 1.05em; text-align: center; font-style: italic; background-color: #ffffff;">Síntomas</td></tr>
<tr><td style="border: 2px solid #000; padding: 8px; background-color: #f97316; font-size: 0.85em; line-height: 1.35;">
<strong>El paciente tiene un historial de EPOC</strong><br>
<strong>Inicio agudo de falta de aire</strong><br>
<strong>Sibilancias durante la inspiración y la espiración</strong><br>
<strong>El paciente prefiere sentarse derecho</strong>
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
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #ef4444; color: white;">La EPOC refractaria puede ser potencialmente mortal</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #ef4444; color: white;">Arritmia</td></tr>
</table>
</td>
<td style="vertical-align: top; padding: 0;">
<table id="epoc-manejo" style="border-collapse: collapse; width: 100%;">
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 1.05em; text-align: center; font-style: italic; background-color: #ffffff;">Manejo de Emergencia de la<br>Crisis de EPOC</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #f97316;">Detenga todos los procedimientos dentales</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; line-height: 1.35; background-color: #f97316;">Pida al paciente que use su propio inhalador<br>Si el paciente no tiene inhalador, administre albuterol, dos puffs</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; line-height: 1.35; background-color: #f97316;">Administre oxígeno solo si está seguro de que el paciente no retiene CO₂ por historial</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #f97316;">Monitoree la presión arterial y el pulso</td></tr>
<tr><td style="border: 2px solid #000; padding: 8px; font-weight: bold; font-size: 0.85em; line-height: 1.4; background-color: #ef4444; color: white;">
Si la EPOC es refractaria al tratamiento inicial:<br>
&nbsp;&nbsp;&nbsp;Administre <span style="color: #93c5fd; font-weight: bold;">2 puffs adicionales de albuterol</span><br>
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
console.log('COPD section appended successfully!');
