const fs = require('fs');
let c = fs.readFileSync('protocolos_traducidos.md', 'utf8');

const idx = c.indexOf('## Paro Cardiopulmonar');
const end = c.indexOf('\n## ', idx + 1);

const newSection = `## Paro Cardiopulmonar

<table style="border-collapse: separate; border-spacing: 24px 0; width: 100%; table-layout: fixed;">
<colgroup>
<col style="width: 40%">
<col style="width: 60%">
</colgroup>
<tr>
<td style="vertical-align: top; padding: 0;">
<table style="border-collapse: collapse; width: 100%;">
<tr><td style="border: 2px solid #ef4444; background-color: #ef4444; color: white; padding: 6px 8px; font-weight: bold; font-size: 0.9em;">Paro Cardiopulmonar: Cese de función cardíaca y respiratoria</td></tr>
</table>
<br>
<table style="border-collapse: collapse; width: 100%;">
<tr><td style="border: 2px solid #000; padding: 8px; text-align: center; font-size: 1.05em; font-weight: bold; font-style: italic; background-color: #ef4444; color: white;">Diagnóstico</td></tr>
<tr><td style="border: 2px solid #000; padding: 8px; font-weight: bold; font-size: 0.95em;">1. El paciente está inconsciente</td></tr>
<tr><td style="border: 2px solid #000; padding: 8px; font-weight: bold; font-size: 0.95em;">2. Sienta el pulso carotídeo:<br>&nbsp;&nbsp;&nbsp;No hay pulso carotídeo</td></tr>
<tr><td style="border: 2px solid #000; padding: 8px; font-weight: bold; font-size: 0.95em;">3. Verifique la respiración:<br>&nbsp;&nbsp;&nbsp;No hay respiración</td></tr>
</table>
<div style="display: flex; justify-content: center; margin: 6px 0;">
<svg width="18" height="34" viewBox="0 0 18 34">
<line x1="9" y1="0" x2="9" y2="24" stroke="black" stroke-width="2.5"/>
<polygon points="2,22 9,33 16,22" fill="black"/>
</svg>
</div>
<table id="paro-origen" style="border-collapse: collapse; width: 100%;">
<tr><td style="border: 2px solid #ef4444; background-color: #ef4444; color: white; padding: 6px 8px; font-weight: bold; text-align: center; font-style: italic; font-size: 0.95em;">Intervención Inmediata</td></tr>
<tr><td style="border: 2px solid #000; padding: 8px; font-weight: bold; font-size: 0.9em;">Detenga todos los procedimientos dentales</td></tr>
<tr><td style="border: 2px solid #000; padding: 8px; font-weight: bold; font-size: 0.9em;">El dentista debe quedarse con el paciente<br>Inicie el protocolo de Soporte Vital Básico</td></tr>
<tr><td style="border: 2px solid #000; padding: 8px; font-weight: bold; font-size: 0.9em;">El asistente debe alertar al resto del personal en la oficina y activar el protocolo de emergencia</td></tr>
</table>
</td>
<td style="vertical-align: top; padding: 0;">
<table id="paro-dentista" style="border-collapse: collapse; width: 100%; margin-bottom: 12px;">
<tr><td style="border: 2px solid #ef4444; background-color: #ef4444; color: white; padding: 6px 8px; font-weight: bold; font-style: italic; font-size: 0.9em;">Dentista: Inicie la reanimación cardiopulmonar (RCP)</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.82em; line-height: 1.35;">
<strong>Posición:</strong> El paciente debe estar supino en una superficie firme<br>
<strong>Vía aérea:</strong> Empuje mandibular; inclinación cabeza-levantamiento mentón; coloque vía aérea oral faríngea apropiada. Despeje posterior de la garganta con succión si es necesario<br>
<strong>Respiración:</strong> Bolsa Ambu y mascarilla con O&#x2082; al 100% a 25 L/min. Dé 2 respiraciones por cada 30 compresiones<br>
<strong>Circulación:</strong> Ciclos de 30 compresiones y 2 respiraciones hasta que llegue el DEA<br>
<strong>Si el DEA indica desfibrilación:</strong> Despeje el área, desfibrile con 360 J. Reanude RCP inmediatamente por 5 ciclos. Repita según DEA<br>
<strong>Medidas Definitivas:</strong> <span style="color: #ef4444; font-weight: bold;">Inicie acceso IV/IO si capacitado. Inicie fármacos de emergencia según protocolo</span>
</td></tr>
</table>
<table id="paro-asistente" style="border-collapse: collapse; width: 100%; margin-bottom: 12px;">
<tr><td style="border: 2px solid #ef4444; background-color: #ef4444; color: white; padding: 6px 8px; font-weight: bold; font-style: italic; font-size: 0.9em;">Asistente: Asista en la reanimación cardiopulmonar</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.82em; line-height: 1.35;">
<strong>Traiga equipo de emergencia:</strong> Tanque O&#x2082; con mascarilla y detector CO&#x2082;, DEA, kit de medicamentos<br>
<strong>Circulación (Compresión esternal):</strong> Talón de una mano sobre la otra en el centro del pecho entre pezones. Empuje fuerte y rápido a 100/min con liberación total. Minimice interrupciones (máx. 10 s). Ciclos 30:2
</td></tr>
</table>
<table id="paro-personal" style="border-collapse: collapse; width: 100%;">
<tr><td style="border: 2px solid #ef4444; background-color: #ef4444; color: white; padding: 6px 8px; font-weight: bold; font-style: italic; font-size: 0.9em;">Personal de Oficina: Asistir en emergencia</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.82em; line-height: 1.35;">
<strong>Llame al 911</strong> y active el servicio médico de emergencia<br>
Asista en la reanimación cardiopulmonar<br>
Dirija al personal de EMS a la ubicación apropiada
</td></tr>
</table>
</td>
</tr>
</table>

`;

c = c.slice(0, idx) + newSection + c.slice(end);
fs.writeFileSync('protocolos_traducidos.md', c);
console.log('Done!');
