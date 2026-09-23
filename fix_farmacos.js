const fs = require('fs');
let c = fs.readFileSync('protocolos_traducidos.md', 'utf8');

const idx = c.indexOf('## Paro Cardiopulmonar: Protocolo de Fármacos');
const nextIdx = c.indexOf('\n## ', idx + 1);

const newSection = `## Paro Cardiopulmonar: Protocolo de Fármacos

<table style="border-collapse: separate; border-spacing: 70px 0; width: 100%; table-layout: fixed;">
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
<table id="farmacos-analice-ritmo" style="border-collapse: collapse; width: 100%;">
<tr><td style="border: 2px solid #000; background-color: #ef4444; color: white; padding: 8px; font-weight: bold; font-style: italic; text-align: center; font-size: 1.05em;">Analice el ritmo</td></tr>
<tr><td style="border: 2px solid #000; padding: 8px; font-weight: bold; font-size: 0.9em; text-align: center;">Ritmo desfibrilable<br>Fibrilación Ventricular o<br>Taquicardia Ventricular (TV/FV)</td></tr>
<tr><td style="border: 2px solid #000; padding: 8px; font-weight: bold; font-size: 0.9em; text-align: center;">Ritmo no desfibrilable<br>AEP (Actividad Eléctrica Sin Pulso) o Asistolia</td></tr>
</table>
<div style="display: flex; justify-content: center; margin: 6px 0;">
<svg width="18" height="34" viewBox="0 0 18 34">
<line x1="9" y1="0" x2="9" y2="24" stroke="black" stroke-width="2.5"/>
<polygon points="2,22 9,33 16,22" fill="black"/>
</svg>
</div>
<table id="farmacos-linea-iv" style="border-collapse: collapse; width: 100%;">
<tr><td style="border: 2px solid #ef4444; background-color: #ef4444; color: white; padding: 6px 8px; font-weight: bold; text-align: center; font-style: italic; font-size: 0.95em;">Inicie línea intravenosa o establezca acceso intraóseo</td></tr>
<tr><td style="border: 2px solid #000; padding: 8px; font-weight: bold; font-size: 0.9em; text-align: center;">Al menos calibre #18 IV</td></tr>
<tr><td style="border: 2px solid #000; padding: 8px; font-weight: bold; font-size: 0.9em; text-align: center;">Inicie infusión amplia<br>Infusión de Solución Salina Normal</td></tr>
</table>
<div style="display: flex; justify-content: center; margin: 6px 0;">
<svg width="18" height="34" viewBox="0 0 18 34">
<line x1="9" y1="0" x2="9" y2="24" stroke="black" stroke-width="2.5"/>
<polygon points="2,22 9,33 16,22" fill="black"/>
</svg>
</div>
<table style="border-collapse: collapse; width: 100%;">
<tr><td style="border: 2px solid #ef4444; background-color: #ef4444; color: white; padding: 6px 8px; font-weight: bold; text-align: center; font-style: italic; font-size: 0.95em;">Intubar</td></tr>
<tr><td style="border: 2px solid #000; padding: 8px; font-weight: bold; font-size: 0.9em; text-align: center;">Intubación endotraqueal o<br>Acceso orolaríngeo</td></tr>
<tr><td style="border: 2px solid #000; padding: 8px; font-weight: bold; font-size: 0.9em; text-align: center;">100% de Oxígeno a alto flujo</td></tr>
</table>
</td>
<td style="vertical-align: top; padding: 0;">
<table id="farmacos-desfibrilables" style="border-collapse: collapse; width: 100%; margin-bottom: 14px;">
<tr><td style="border: 2px solid #ef4444; background-color: #ef4444; color: white; padding: 6px 8px; text-align: center; font-weight: bold; font-style: italic; font-size: 0.9em;">Ritmos Desfibrilables<br>Taquicardia Ventricular y Fibrilación Ventricular</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.82em; line-height: 1.35;"><strong>Desfibrile con 360 Julios<br>Continúe reanimación cardiopulmonar en todo momento</strong></td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.82em; line-height: 1.35;"><strong>Analice el ritmo nuevamente, si hay un ritmo desfibrilable<br>Desfibrile nuevamente</strong></td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.82em; line-height: 1.35;"><strong>Analice el ritmo nuevamente, si hay un ritmo desfibrilable<br><span style="color: #ef4444;">Administre 1 mg de epinefrina por vía intravenosa (IV) o intraósea (IO)</span><br>Desfibrile nuevamente</strong></td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.82em; line-height: 1.35;"><strong>Analice el ritmo nuevamente, si hay un ritmo desfibrilable<br><span style="color: #ef4444;">Administre 300 mg de amiodarona por vía intravenosa (IV)</span><br>Desfibrile nuevamente</strong></td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.82em; line-height: 1.35; font-weight: bold;">Si el ritmo se restablece transitoriamente pero no se mantiene exitosamente entre choques repetidos, proceda con terapia antiarrítmica</td></tr>
</table>
<table id="farmacos-no-desfibrilables" style="border-collapse: collapse; width: 100%;">
<tr><td style="border: 2px solid #ef4444; background-color: #ef4444; color: white; padding: 6px 8px; text-align: center; font-weight: bold; font-style: italic; font-size: 0.9em;">Ritmos No Desfibrilables<br>Actividad Eléctrica Sin Pulso y Asistolia</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.82em; line-height: 1.35; font-weight: bold;">No se beneficiará de la desfibrilación</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.82em; line-height: 1.35; font-weight: bold;">Continúe reanimación cardiopulmonar mientras se establece acceso venoso y vía aérea avanzada (LMA, Combitube o tubo endotraqueal). Use detector de CO₂ para la ubicación del tubo</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.82em; line-height: 1.35;"><strong><span style="color: #ef4444;">Administre 1 mg de epinefrina IV o IO; esto puede repetirse cada 3-5 minutos</span></strong></td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.82em; line-height: 1.35; font-weight: bold;">Analice el ritmo</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.82em; line-height: 1.35;"><strong><span style="color: #ef4444;">Si hay AEP o asistolia persistente, administre 40 unidades de vasopresina IV/IO<br>Para asistolia persistente o AEP lenta, administre 1 mg de atropina IV/IO</span></strong></td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.82em; line-height: 1.35; font-weight: bold;">Analice el ritmo</td></tr>
<tr><td style="border: 2px solid #000; padding: 6px 8px; font-size: 0.82em; line-height: 1.35; font-weight: bold;">Si hay un ritmo desfibrilable, desfibrile</td></tr>
</table>
</td>
</tr>
</table>

`;

c = c.slice(0, idx) + newSection + c.slice(nextIdx);
fs.writeFileSync('protocolos_traducidos.md', c);
console.log('Drug protocol section updated!');
