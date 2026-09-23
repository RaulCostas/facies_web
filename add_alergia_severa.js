const fs = require('fs');
let c = fs.readFileSync('protocolos_traducidos.md', 'utf8');

const newSection = `

## Manejo de Emergencia de la Reacción Alérgica Severa

<table style="border-collapse: separate; border-spacing: 70px 0; width: 100%; table-layout: fixed;">
<colgroup>
<col style="width: 42%">
<col style="width: 58%">
</colgroup>
<tr>
<td style="vertical-align: top; padding: 0;">
<table style="border-collapse: collapse; width: 100%;">
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.88em; background-color: #ffffff;">
Reacción Alérgica Severa: además de erupción cutánea o urticaria, el paciente puede tener dificultades respiratorias e inestabilidad hemodinámica<br><br>
Anafilaxia: reacción alérgica severa con compromiso de la vía aérea e hipotensión; esta es una emergencia catastrófica que requiere traslado inmediato a un centro médico
</td></tr>
</table>
<br>
<table id="alergia-severa-sintomas" style="border-collapse: collapse; width: 100%;">
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 1.05em; text-align: center; font-style: italic; background-color: #ffffff;">Síntomas</td></tr>
<tr><td style="border: 2px solid #000; padding: 8px; background-color: #facc15; font-size: 0.85em; line-height: 1.35;">
<strong>Picazón</strong><br>
<strong>Erupción en el tronco y la cara: erupción maculopapular</strong><br>
<strong>Urticaria</strong>
</td></tr>
<tr><td style="border: 2px solid #000; padding: 8px; background-color: #f97316; font-size: 0.85em; line-height: 1.35;">
<strong>Sibilancias durante la inspiración (Estridor)</strong>
</td></tr>
<tr><td style="border: 2px solid #000; padding: 8px; background-color: #ef4444; color: #ffffff; font-size: 0.85em; line-height: 1.35;">
<strong style="color: #ffffff;">Hipotensión</strong><br>
<strong style="color: #ffffff;">Aumento del compromiso de las vías respiratorias superiores</strong><br>
<strong style="color: #ffffff;">Anafilaxia</strong>
</td></tr>
</table>
</td>
<td style="vertical-align: top; padding: 0;">
<table id="alergia-severa-manejo" style="border-collapse: collapse; width: 100%;">
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 1.05em; text-align: center; font-style: italic; background-color: #ffffff;">Manejo de Emergencia de la<br>Reacción Alérgica Severa</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #f97316;">Detenga todos los procedimientos dentales</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #f97316;">Siente al paciente en una posición cómoda</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #f97316;">Administre Benadryl 50 mg IM en el músculo deltoides</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #f97316;">Administre oxígeno</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #f97316;">Monitoree la presión arterial y el pulso</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #f97316;">
Si los síntomas no mejoran rápidamente, administre 1 ampolla de epinefrina 0.3 mg IM en el muslo
</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #ef4444; color: #ffffff;">
Administre <span style="color: #93c5fd; font-weight: bold;">epinefrina 0.3 mg IM</span> en el muslo
</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #ef4444; color: #ffffff;">
Administre <span style="color: #93c5fd; font-weight: bold;">Benadryl 50 mg IM</span> en el músculo deltoides
</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #ef4444; color: #ffffff;">Administre oxígeno</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #ef4444; color: #ffffff;">Monitoree la presión arterial y el pulso</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #ef4444; color: #ffffff;">Inicie IV, infunda Solución Salina Normal</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #ef4444; color: #ffffff;">Llame al 911 y active los Servicios Médicos de Emergencia</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-weight: bold; font-size: 0.85em; background-color: #ef4444; color: #ffffff;">Transfiera al paciente a la Sala de Emergencias</td></tr>
</table>
</td>
</tr>
</table>
`;

c += newSection;
fs.writeFileSync('protocolos_traducidos.md', c);
console.log('Severe Allergic Reaction section appended!');
