const fs = require('fs');
let c = fs.readFileSync('protocolos_traducidos.md', 'utf8');

const idx = c.indexOf('## Manejo de Emergencia del Infarto de Miocardio en Evolución');
const nextIdx = c.indexOf('\n## ', idx + 1);

const newSection = `## Manejo de Emergencia del Infarto de Miocardio en Evolución

<table style="border-collapse: separate; border-spacing: 70px 0; width: 100%; table-layout: fixed;">
<colgroup>
<col style="width: 42%">
<col style="width: 58%">
</colgroup>
<tr>
<td style="vertical-align: top; padding: 0;">
<table style="border-collapse: collapse; width: 100%;">
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.88em; background-color: #ffffff;">Infarto de miocardio: resultado de lesión incurrida como resultado de isquemia prolongada en el corazón</td></tr>
</table>
<br>
<table id="infarto-sintomas" style="border-collapse: collapse; width: 100%;">
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 1.05em; text-align: center; font-style: italic; background-color: #ffffff;">Síntomas</td></tr>
<tr><td style="border: 2px solid #000; padding: 8px; background-color: #ef4444; color: white; font-size: 0.85em; line-height: 1.35;">
<strong>Dolor de pecho severo y aplastante</strong><br>
<strong>Irradiación a la mandíbula y a la cara medial del brazo</strong><br>
<strong>El paciente a menudo está pálido, ceniciento y diaforético</strong><br>
<strong>El paciente puede tener náuseas y vómitos</strong>
</td></tr>
</table>
<div style="display: flex; justify-content: center; margin: 8px 0;">
<svg width="20" height="38" viewBox="0 0 20 38">
<line x1="10" y1="0" x2="10" y2="26" stroke="black" stroke-width="3"/>
<polygon points="3,24 10,36 17,24" fill="black"/>
</svg>
</div>
<table style="border-collapse: collapse; width: 100%;">
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 1.05em; text-align: center; font-style: italic; background-color: #ffffff;">Complicaciones del<br>Infarto de Miocardio</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #ef4444; color: white;">Progresión a shock cardiogénico</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #ef4444; color: white;">Arritmia</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #f97316;">Insuficiencia cardíaca congestiva</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #f97316;">Enfermedad del sistema de conducción y bloqueo cardíaco</td></tr>
</table>
</td>
<td style="vertical-align: top; padding: 0;">
<table id="infarto-manejo" style="border-collapse: collapse; width: 100%;">
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 1.05em; text-align: center; font-style: italic; background-color: #ffffff;">Manejo de Emergencia del<br>Infarto de Miocardio en Evolución</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #ef4444; color: white;">Detenga todos los procedimientos dentales</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; line-height: 1.35; background-color: #ef4444; color: white;">Administre spray o tableta de nitroglicerina sublingual (0.3 mg)<br>Use la nitroglicerina del paciente, asegurándose de que no haya caducado</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #ef4444; color: white;">Administre oxígeno</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #ef4444; color: white;">Monitoree la presión arterial y el pulso</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #ef4444; color: white;">Inicie IV</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; line-height: 1.35; background-color: #ef4444; color: white;">Administre óxido nitroso, si está disponible<br>50% óxido nitroso con 50% oxígeno</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #ef4444; color: white;">Pida al paciente que mastique 325 mg de aspirina</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #ef4444; color: white;">Llame al 911 y active los Servicios Médicos de Emergencia</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #ef4444; color: white;">Si el dolor no se alivia después de 5 minutos:<br>&nbsp;&nbsp;&nbsp;Dé una segunda nitroglicerina</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #ef4444; color: white;">Transfiera al paciente a la Sala de Emergencias</td></tr>
</table>
</td>
</tr>
</table>

`;

c = c.slice(0, idx) + newSection + c.slice(nextIdx);
fs.writeFileSync('protocolos_traducidos.md', c);
console.log('Myocardial Infarction emergency management section updated!');
