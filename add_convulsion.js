const fs = require('fs');
let c = fs.readFileSync('protocolos_traducidos.md', 'utf8');

const newSection = `

## Evaluación del Paciente con Convulsiones

<table style="border-collapse: separate; border-spacing: 70px 0; width: 100%; table-layout: fixed;">
<colgroup>
<col style="width: 44%">
<col style="width: 56%">
</colgroup>
<tr>
<td style="vertical-align: top; padding: 0;">
<table style="border-collapse: collapse; width: 100%;">
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 1.05em; text-align: center; font-style: italic; background-color: #ffffff;">Estado Mental Alterado</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.95em; font-style: italic; background-color: #f97316;">Convulsión</td></tr>
</table>

<div style="display: flex; justify-content: center; margin: 8px 0;">
<svg width="20" height="38" viewBox="0 0 20 38">
<line x1="10" y1="0" x2="10" y2="26" stroke="black" stroke-width="3"/>
<polygon points="3,24 10,36 17,24" fill="black"/>
</svg>
</div>

<table id="convulsion-caract-box" style="border-collapse: collapse; width: 100%;">
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 1.05em; text-align: center; font-style: italic; background-color: #ffffff;">Convulsión</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.85em; line-height: 1.35; background-color: #f97316;">Por lo general, se sabe que el paciente tiene un trastorno convulsivo y a menudo toma medicamentos</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.85em; line-height: 1.35; background-color: #f97316;">La mayoría de los pacientes tienen un inicio abrupto de convulsiones tónico-clónicas</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.85em; line-height: 1.35; background-color: #f97316;">Algunos pueden presentarse solo con alteración del estado mental</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.85em; line-height: 1.35; background-color: #f97316;">La mayoría de las convulsiones son autolimitadas y no requieren intervención con medicamentos anticonvulsivos</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.85em; line-height: 1.35; background-color: #f97316;">La mayoría de los pacientes aún pueden tener el estado mental alterado después de la convulsión (estado postictal), pero mejorarían gradualmente</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.85em; line-height: 1.35; background-color: #ef4444; color: #ffffff;">El paciente con convulsiones persistentes tiene un estado epiléptico potencialmente mortal</td></tr>
</table>
</td>

<td style="vertical-align: top; padding: 0;">
<table id="convulsion-interv-box" style="border-collapse: collapse; width: 100%;">
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 1.05em; text-align: center; font-style: italic; background-color: #ffffff;">Intervenciones Inmediatas</td></tr>
<tr><td style="border: 2px solid #000; padding: 8px; font-size: 0.88em; line-height: 1.4;">
<strong>Detenga todos los procedimientos dentales</strong><br><br>
<strong>Retire los instrumentos del campo</strong><br><br>
<strong>Cuando las convulsiones tónico-clónicas cesen, coloque al paciente en una posición que minimice la aspiración:</strong> gire cuidadosamente al paciente sobre su lado izquierdo<br><br>
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
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.85em; line-height: 1.35; background-color: #f97316;">Inicie IV; infunda Solución Salina Normal a 100 cc/hora</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.85em; line-height: 1.35; background-color: #ef4444; color: #ffffff;">En el caso poco común de que una convulsión dure más de 5 minutos, administre Diazepam (Valium) por vía intravenosa, 0.1 mg/kg cada 5 minutos, sin exceder los 30 mg en 8 horas</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.85em; line-height: 1.35; background-color: #f97316;">Transfiera a ER tan pronto como sea posible</td></tr>
</table>
</td>
</tr>
</table>
`;

c += newSection;
fs.writeFileSync('protocolos_traducidos.md', c);
console.log('Seizure section appended!');
