import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import logoImg from './assets/logo.jpg';

// Arrow connection config: from element -> to elements
const ARROW_CONFIGS = [
  // Paro Cardiopulmonar (Algoritmo de roles)
  {
    fromId: 'paro-origen',
    fromAnchor: 'paro-row-dentist',
    targets: [
      { toId: 'paro-dentista', toAnchor: 'dentist-bottom-left' },
    ]
  },
  {
    fromId: 'paro-origen',
    fromAnchor: 'paro-row-assistant',
    targets: [
      { toId: 'paro-asistente', toAnchor: 'assistant-bottom-left' },
    ]
  },
  {
    fromId: 'paro-origen',
    fromAnchor: 'paro-row-office',
    targets: [
      { toId: 'paro-personal', toAnchor: 'office-mid-left' },
    ]
  },
  // Paro Cardiopulmonar: Protocolo de Fármacos
  {
    fromId: 'farmacos-analice-ritmo',
    fromAnchor: 'shockable-row',
    targets: [
      { toId: 'farmacos-desfibrilables', toAnchor: 'target-shockable' },
    ]
  },
  {
    fromId: 'farmacos-analice-ritmo',
    fromAnchor: 'non-shockable-row',
    targets: [
      { toId: 'farmacos-no-desfibrilables', toAnchor: 'target-non-shockable' },
    ]
  },
  // Evaluación del Paciente con Dolor en el Pecho
  {
    fromId: 'dolor-pecho-box',
    fromAnchor: 'cardiac-pain-row',
    targets: [
      { toId: 'dolor-cardiaco-target', toAnchor: 'target-cardiac-pain' },
    ]
  },
  {
    fromId: 'dolor-pecho-box',
    fromAnchor: 'non-cardiac-pain-row',
    targets: [
      { toId: 'dolor-no-cardiaco-target', toAnchor: 'target-non-cardiac-pain' },
    ]
  },
  // Manejo de Emergencia de la Angina
  {
    fromId: 'angina-sintomas',
    fromAnchor: 'angina-symptoms-mid-right',
    targets: [
      { toId: 'angina-manejo', toAnchor: 'angina-mgmt-target' },
    ]
  },
  // Manejo de Emergencia del Infarto de Miocardio en Evolución
  {
    fromId: 'infarto-sintomas',
    fromAnchor: 'infarto-symptoms-mid-right',
    targets: [
      { toId: 'infarto-manejo', toAnchor: 'infarto-mgmt-target' },
    ]
  },
  // Manejo de Emergencia de Sospecha de Embolia Pulmonar
  {
    fromId: 'embolia-sintomas',
    fromAnchor: 'embolia-symptoms-mid-right',
    targets: [
      { toId: 'embolia-manejo', toAnchor: 'embolia-mgmt-target' },
    ]
  },
  // Evaluación del Paciente con Falta de Aire
  {
    fromId: 'falta-aire-box',
    fromAnchor: 'hiperventilacion-row',
    targets: [
      { toId: 'falta-hiperventilacion-target', toAnchor: 'target-hiperventilacion' },
    ]
  },
  {
    fromId: 'falta-aire-box',
    fromAnchor: 'pulmonares-row',
    targets: [
      { toId: 'falta-pulmonares-target', toAnchor: 'target-pulmonares' },
    ]
  },
  {
    fromId: 'falta-aire-box',
    fromAnchor: 'cardiacas-row',
    targets: [
      { toId: 'falta-cardiacas-target', toAnchor: 'target-cardiacas' },
    ]
  },
  // Manejo de Emergencia de la Hiperventilación
  {
    fromId: 'hiperventilacion-sintomas',
    fromAnchor: 'hiperventilacion-symptoms-mid-right',
    targets: [
      { toId: 'hiperventilacion-manejo', toAnchor: 'hiperventilacion-mgmt-target' },
    ]
  },
  // Manejo de Emergencia del Asma
  {
    fromId: 'asma-sintomas',
    fromAnchor: 'asma-symptoms-mid-right',
    targets: [
      { toId: 'asma-manejo', toAnchor: 'asma-mgmt-target' },
    ]
  },
  // Manejo de Emergencia de la Exacerbación Aguda de la EPOC
  {
    fromId: 'epoc-sintomas',
    fromAnchor: 'epoc-symptoms-mid-right',
    targets: [
      { toId: 'epoc-manejo', toAnchor: 'epoc-mgmt-target' },
    ]
  },
  // Manejo de Emergencia de la Insuficiencia Cardíaca Congestiva
  {
    fromId: 'icc-sintomas',
    fromAnchor: 'icc-symptoms-mid-right',
    targets: [
      { toId: 'icc-manejo', toAnchor: 'icc-mgmt-target' },
    ]
  },
  // Manejo de Emergencia de la Obstrucción de la Vía Aérea por Cuerpo Extraño
  {
    fromId: 'obstruccion-sintomas',
    fromAnchor: 'obstruccion-symptoms-mid-right',
    targets: [
      { toId: 'obstruccion-manejo', toAnchor: 'obstruccion-mgmt-target' },
    ]
  },
  // Manejo de Emergencia de la Bradicardia (3 flechas clínicas)
  {
    fromId: 'bradi-sym-orange',
    fromAnchor: 'mid-right',
    targets: [
      { toId: 'bradi-row-pulso', toAnchor: 'mid-left' },
    ]
  },
  {
    fromId: 'bradi-sym-red',
    fromAnchor: 'mid-right',
    targets: [
      { toId: 'bradi-row-iv', toAnchor: 'mid-left' },
    ]
  },
  {
    fromId: 'bradi-rate-under40',
    fromAnchor: 'mid-right',
    targets: [
      { toId: 'bradi-row-atropina', toAnchor: 'top-left' },
    ]
  },
  // Manejo de Emergencia de la Taquicardia (4 flechas clínicas)
  {
    fromId: 'taquicardia-eval-sintomas',
    fromAnchor: 'taq-sym-green',
    targets: [
      { toId: 'taquicardia-manejo-svt', toAnchor: 'taq-mgmt-green' },
    ]
  },
  {
    fromId: 'taquicardia-eval-sintomas',
    fromAnchor: 'taq-sym-symptomatic',
    targets: [
      { toId: 'taquicardia-manejo-svt', toAnchor: 'taq-mgmt-orange' },
    ]
  },
  {
    fromId: 'taquicardia-eval-sintomas',
    fromAnchor: 'taq-sym-not-tolerating',
    targets: [
      { toId: 'taquicardia-manejo-vt', toAnchor: 'taq-mgmt-vt-cpr' },
    ]
  },
  {
    fromId: 'taquicardia-eval-ritmo',
    fromAnchor: 'taq-rate-vt',
    targets: [
      { toId: 'taquicardia-manejo-vt', toAnchor: 'taq-mgmt-vt' },
    ]
  },
  // Manejo de Emergencia de la Hipotensión (3 flechas clínicas)
  {
    fromId: 'hipotension-severidad',
    fromAnchor: 'hipo-sev-yellow',
    targets: [
      { toId: 'hipotension-manejo', toAnchor: 'hipo-mgmt-yellow' },
    ]
  },
  {
    fromId: 'hipotension-severidad',
    fromAnchor: 'hipo-sev-orange',
    targets: [
      { toId: 'hipotension-manejo', toAnchor: 'hipo-mgmt-orange' },
    ]
  },
  {
    fromId: 'hipotension-severidad',
    fromAnchor: 'hipo-sev-red',
    targets: [
      { toId: 'hipotension-manejo', toAnchor: 'hipo-mgmt-red' },
    ]
  },
  // Manejo de Emergencia de la Reacción Alérgica Leve (2 flechas clínicas)
  {
    fromId: 'alergia-leve-sintomas',
    fromAnchor: 'alergia-sym-yellow',
    targets: [
      { toId: 'alergia-leve-manejo', toAnchor: 'alergia-mgmt-yellow' },
    ]
  },
  {
    fromId: 'alergia-leve-sintomas',
    fromAnchor: 'alergia-sym-hives',
    targets: [
      { toId: 'alergia-leve-manejo', toAnchor: 'alergia-mgmt-hives' },
    ]
  },
  // Manejo de Emergencia de la Reacción Alérgica Severa (2 flechas clínicas)
  {
    fromId: 'alergia-severa-sintomas',
    fromAnchor: 'alergia-sev-orange',
    targets: [
      { toId: 'alergia-severa-manejo', toAnchor: 'alergia-sev-mgmt-orange' },
    ]
  },
  {
    fromId: 'alergia-severa-sintomas',
    fromAnchor: 'alergia-sev-red',
    targets: [
      { toId: 'alergia-severa-manejo', toAnchor: 'alergia-sev-mgmt-red' },
    ]
  },
  // Evaluación del Paciente con Alteración del Estado Mental (3 flechas)
  {
    fromId: 'mental-box',
    fromAnchor: 'mental-desmayo-row',
    targets: [
      { toId: 'mental-desmayo-target', toAnchor: 'mental-desmayo-tgt' },
    ]
  },
  {
    fromId: 'mental-box',
    fromAnchor: 'mental-metabolico-row',
    targets: [
      { toId: 'mental-metabolico-target', toAnchor: 'mental-metabolico-tgt' },
    ]
  },
  {
    fromId: 'mental-box',
    fromAnchor: 'mental-neurologico-row',
    targets: [
      { toId: 'mental-convulsion-row', toAnchor: 'mid-left' },
    ]
  },
  // Evaluación del Paciente con Desmayo Simple (Síncope Vasovagal) (1 flecha)
  {
    fromId: 'desmayo-caract-box',
    fromAnchor: 'desmayo-caract-mid-right',
    targets: [
      { toId: 'desmayo-interv-box', toAnchor: 'desmayo-interv-target' },
    ]
  },
  // Evaluación del Paciente con Hipoglucemia (3 flechas)
  {
    fromId: 'hipoglucemia-caract-box',
    fromAnchor: 'hipo-caract-sym-row',
    targets: [
      { toId: 'hipoglucemia-interv-box', toAnchor: 'hipo-interv-target' },
    ]
  },
  {
    fromId: 'hipoglucemia-caract-box',
    fromAnchor: 'hipo-caract-conscious-row',
    targets: [
      { toId: 'hipoglucemia-definitivas-box', toAnchor: 'hipo-def-conscious-tgt' },
    ]
  },
  {
    fromId: 'hipoglucemia-caract-box',
    fromAnchor: 'hipo-caract-unconscious-row',
    targets: [
      { toId: 'hipoglucemia-definitivas-box', toAnchor: 'hipo-def-unconscious-tgt' },
    ]
  },
  // Evaluación del Paciente con Accidente Cerebrovascular (1 flecha)
  {
    fromId: 'acv-caract-box',
    fromAnchor: 'acv-caract-mid-right',
    targets: [
      { toId: 'acv-interv-box', toAnchor: 'acv-interv-target' },
    ]
  },
  // Evaluación del Paciente con Convulsiones (1 flecha)
  {
    fromId: 'convulsion-caract-box',
    fromAnchor: 'convulsion-caract-mid-right',
    targets: [
      { toId: 'convulsion-interv-box', toAnchor: 'convulsion-interv-target' },
    ]
  }
];

interface ArrowLine {
  x1: number; y1: number;
  x2: number; y2: number;
}

function getAnchorPoint(el: HTMLElement, anchor: string, containerRect: DOMRect): { x: number; y: number } {
  const r = el.getBoundingClientRect();
  switch (anchor) {
    case 'mid-right':
      return { x: r.right - containerRect.left, y: r.top - containerRect.top + (r.height * 0.50) };
    case 'mid-left':
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.50) };
    case 'top-left':
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + 16 };
    case 'paro-row-dentist':
      return { x: r.right - containerRect.left, y: r.top - containerRect.top + (r.height * 0.50) };
    case 'paro-row-assistant':
      return { x: r.right - containerRect.left, y: r.top - containerRect.top + (r.height * 0.88) };
    case 'paro-row-office':
      return { x: r.right - containerRect.left, y: r.top - containerRect.top + (r.height * 0.88) };
    case 'dentist-bottom-left':
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.50) };
    case 'assistant-bottom-left':
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.50) };
    case 'office-mid-left':
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.50) };
    // Drug Protocol anchors
    case 'shockable-row':
      return { x: r.right - containerRect.left, y: r.top - containerRect.top + (r.height * 0.42) };
    case 'target-shockable':
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.40) };
    case 'non-shockable-row':
      return { x: r.right - containerRect.left, y: r.top - containerRect.top + (r.height * 0.80) };
    case 'target-non-shockable':
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.56) };
    // Chest Pain Evaluation anchors
    case 'cardiac-pain-row':
      return { x: r.right - containerRect.left, y: r.top - containerRect.top + (r.height * 0.50) };
    case 'target-cardiac-pain':
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.14) };
    case 'non-cardiac-pain-row':
      return { x: r.right - containerRect.left, y: r.top - containerRect.top + (r.height * 0.83) };
    case 'target-non-cardiac-pain':
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.32) };
    // Angina anchors
    case 'angina-symptoms-mid-right':
      return { x: r.right - containerRect.left, y: r.top - containerRect.top + (r.height * 0.65) };
    case 'angina-mgmt-target':
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.35) };
    // Infarction anchors
    case 'infarto-symptoms-mid-right':
      return { x: r.right - containerRect.left, y: r.top - containerRect.top + (r.height * 0.65) };
    case 'infarto-mgmt-target':
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.38) };
    // Pulmonary Embolism anchors
    case 'embolia-symptoms-mid-right':
      return { x: r.right - containerRect.left, y: r.top - containerRect.top + (r.height * 0.65) };
    case 'embolia-mgmt-target':
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.50) };
    // Shortness of Breath anchors
    case 'hiperventilacion-row':
      return { x: r.right - containerRect.left, y: r.top - containerRect.top + (r.height * 0.38) };
    case 'target-hiperventilacion':
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.50) };
    case 'pulmonares-row':
      return { x: r.right - containerRect.left, y: r.top - containerRect.top + (r.height * 0.63) };
    case 'target-pulmonares':
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.12) };
    case 'cardiacas-row':
      return { x: r.right - containerRect.left, y: r.top - containerRect.top + (r.height * 0.88) };
    case 'target-cardiacas':
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.35) };
    // Hyperventilation anchors
    case 'hiperventilacion-symptoms-mid-right':
      return { x: r.right - containerRect.left, y: r.top - containerRect.top + (r.height * 0.50) };
    case 'hiperventilacion-mgmt-target':
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.40) };
    // Asthma anchors
    case 'asma-symptoms-mid-right':
      return { x: r.right - containerRect.left, y: r.top - containerRect.top + (r.height * 0.65) };
    case 'asma-mgmt-target':
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.50) };
    // COPD anchors
    case 'epoc-symptoms-mid-right':
      return { x: r.right - containerRect.left, y: r.top - containerRect.top + (r.height * 0.65) };
    case 'epoc-mgmt-target':
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.50) };
    // Congestive Heart Failure anchors
    case 'icc-symptoms-mid-right':
      return { x: r.right - containerRect.left, y: r.top - containerRect.top + (r.height * 0.65) };
    case 'icc-mgmt-target':
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.46) };
    // Foreign Body Airway Obstruction anchors
    case 'obstruccion-symptoms-mid-right':
      // Right border of "Síntomas" box, vertical center
      return { x: r.right - containerRect.left, y: r.top - containerRect.top + (r.height * 0.50) };
    case 'obstruccion-mgmt-target':
      // Left border of "Manejo de Emergencia...", aligned straight/horizontal
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.38) };
    // Bradycardia anchors (3 branches)
    case 'bradicardia-sym-orange':
      // Right border of row 1 (Antecedentes / Mareos)
      return { x: r.right - containerRect.left, y: r.top - containerRect.top + (r.height * 0.40) };
    case 'bradicardia-mgmt-pulse':
      // Left border of right table at "Monitoree la presión arterial y el pulso"
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.44) };
    case 'bradicardia-sym-red':
      // Right border of row 2 ("Pérdida del conocimiento")
      return { x: r.right - containerRect.left, y: r.top - containerRect.top + (r.height * 0.85) };
    case 'bradicardia-mgmt-iv':
      // Left border of right table directly at "Inicie acceso IV o IO si está capacitado"
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.52) };
    case 'bradicardia-rate-under40':
      // Right border of "Evalúe la Frecuencia" row 2 ("< 40 lpm")
      return { x: r.right - containerRect.left, y: r.top - containerRect.top + (r.height * 0.80) };
    case 'bradicardia-mgmt-atropine':
      // Left border of right table at row 6 ("Si el paciente no tolera la bradicardia...")
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.72) };
    // Tachycardia anchors (4 branches)
    case 'taq-sym-green':
      // Right border of row 1 (Tolera el ritmo)
      return { x: r.right - containerRect.left, y: r.top - containerRect.top + (r.height * 0.38) };
    case 'taq-mgmt-green':
      // Left border of SVT table at green rows (row 3/4)
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.38) };
    case 'taq-sym-symptomatic':
      // Right border of row 2 (Se vuelve sintomático)
      return { x: r.right - containerRect.left, y: r.top - containerRect.top + (r.height * 0.62) };
    case 'taq-mgmt-orange':
      // Left border of SVT table at orange rows (Adenosina)
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.75) };
    case 'taq-sym-not-tolerating':
      // Right border of row 3 (El paciente no tolera el ritmo, roja)
      return { x: r.right - containerRect.left, y: r.top - containerRect.top + (r.height * 0.86) };
    case 'taq-mgmt-vt-cpr':
      // Left border of VT table at row 2 ("RCP")
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.50) };
    case 'taq-rate-vt':
      // Right border of "Evalúe el Ritmo" row 2 ("Ventricular")
      return { x: r.right - containerRect.left, y: r.top - containerRect.top + (r.height * 0.80) };
    case 'taq-mgmt-vt':
      // Left border of VT table at row 3 (Transfiera a ER)
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.82) };
    // Hypotension anchors (3 branches)
    case 'hipo-sev-yellow':
      // Right border of row 1 (Vasovagal con hipotensión)
      return { x: r.right - containerRect.left, y: r.top - containerRect.top + (r.height * 0.38) };
    case 'hipo-mgmt-yellow':
      // Left border of right table at yellow rows (row 3/4)
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.30) };
    case 'hipo-sev-orange':
      // Right border of row 2 (Hipotensión sintomática)
      return { x: r.right - containerRect.left, y: r.top - containerRect.top + (r.height * 0.62) };
    case 'hipo-mgmt-orange':
      // Left border of right table directly at the orange row ("Si el paciente tiene hipotensión sintomática...")
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.60) };
    case 'hipo-sev-red':
      // Right border of row 3 (Shock)
      return { x: r.right - containerRect.left, y: r.top - containerRect.top + (r.height * 0.86) };
    case 'hipo-mgmt-red':
      // Left border of right table at red rows (Epinefrina / ER)
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.85) };
    // Mild Allergic Reaction anchors (2 branches)
    case 'alergia-sym-yellow':
      // Right border of row 1 (Picazón / Erupción)
      return { x: r.right - containerRect.left, y: r.top - containerRect.top + (r.height * 0.40) };
    case 'alergia-mgmt-yellow':
      // Left border of right table at yellow rows (row 4/5)
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.50) };
    case 'alergia-sym-hives':
      // Right border of row 2 (Urticaria)
      return { x: r.right - containerRect.left, y: r.top - containerRect.top + (r.height * 0.85) };
    case 'alergia-mgmt-hives':
      // Left border of right table at row 7 (Medrol pak)
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.88) };
    // Severe Allergic Reaction anchors (2 branches)
    case 'alergia-sev-orange':
      // Right border of row 2 (lowered slightly)
      return { x: r.right - containerRect.left, y: r.top - containerRect.top + (r.height * 0.58) };
    case 'alergia-sev-mgmt-orange':
      // Left border of right table lowered to row 2/3 ("Administre Benadryl 50 mg IM...")
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.18) };
    case 'alergia-sev-red':
      // Right border of row 3 ("Hipotensión / Anafilaxia")
      return { x: r.right - containerRect.left, y: r.top - containerRect.top + (r.height * 0.82) };
    case 'alergia-sev-mgmt-red':
      // Left border of right table at "Administre oxígeno" in the red section
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.65) };
    // Alteration in Mental Status anchors (3 branches)
    case 'mental-desmayo-row':
      return { x: r.right - containerRect.left, y: r.top - containerRect.top + (r.height * 0.38) };
    case 'mental-desmayo-tgt':
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.50) };
    case 'mental-metabolico-row':
      return { x: r.right - containerRect.left, y: r.top - containerRect.top + (r.height * 0.63) };
    case 'mental-metabolico-tgt':
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.20) };
    case 'mental-neurologico-row':
      return { x: r.right - containerRect.left, y: r.top - containerRect.top + (r.height * 0.88) };
    case 'mental-neurologico-tgt':
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.75) };
    // Simple Faint anchors
    case 'desmayo-caract-mid-right':
      return { x: r.right - containerRect.left, y: r.top - containerRect.top + (r.height * 0.40) };
    case 'desmayo-interv-target':
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.82) };
    // Hypoglycemia anchors (3 branches)
    case 'hipo-caract-sym-row':
      return { x: r.right - containerRect.left, y: r.top - containerRect.top + (r.height * 0.35) };
    case 'hipo-interv-target':
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.82) };
    case 'hipo-caract-conscious-row':
      return { x: r.right - containerRect.left, y: r.top - containerRect.top + (r.height * 0.72) };
    case 'hipo-def-conscious-tgt':
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.20) };
    case 'hipo-caract-unconscious-row':
      return { x: r.right - containerRect.left, y: r.top - containerRect.top + (r.height * 0.90) };
    case 'hipo-def-unconscious-tgt':
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.38) };
    // Cerebrovascular Accident anchors
    case 'acv-caract-mid-right':
      return { x: r.right - containerRect.left, y: r.top - containerRect.top + (r.height * 0.45) };
    case 'acv-interv-target':
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.82) };
    // Seizure anchors
    case 'convulsion-caract-mid-right':
      return { x: r.right - containerRect.left, y: r.top - containerRect.top + (r.height * 0.45) };
    case 'convulsion-interv-target':
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.82) };
    default:
      return { x: r.left - containerRect.left, y: r.top - containerRect.top };
  }
}

interface ProtocolItem {
  id: string;
  name: string;
}

interface CategoryGroup {
  id: string;
  title: string;
  icon: string;
  titleColor: string;
  cardBorder: string;
  btnBg: string;
  btnBorder: string;
  btnText: string;
  btnHoverBg: string;
  items: ProtocolItem[];
}

const PROTOCOL_DASHBOARD: CategoryGroup[] = [
  {
    id: 'cat-1',
    title: '1. PREPARACIÓN PARA EMERGENCIAS',
    icon: '📋',
    titleColor: '#1e3a8a',
    cardBorder: '#bfdbfe',
    btnBg: '#f0f9ff',
    btnBorder: '#bae6fd',
    btnText: '#0369a1',
    btnHoverBg: '#e0f2fe',
    items: [
      { id: 'sec-guia-usuario', name: 'Guía del Usuario' },
      { id: 'sec-roles-equipo', name: 'Roles del Equipo' },
      { id: 'sec-equipo-farmacos', name: 'Equipo y Fármacos' },
    ]
  },
  {
    id: 'cat-2',
    title: '2. PARO CARDIOPULMONAR',
    icon: '❤️',
    titleColor: '#b91c1c',
    cardBorder: '#fecaca',
    btnBg: '#fee2e2',
    btnBorder: '#fca5a5',
    btnText: '#991b1b',
    btnHoverBg: '#fecaca',
    items: [
      { id: 'sec-paro-cardiopulmonar', name: 'Paro Cardiopulmonar' },
      { id: 'sec-paro-farmacos', name: 'Protocolo de Fármacos' },
    ]
  },
  {
    id: 'cat-3',
    title: '3. DOLOR EN EL PECHO',
    icon: '💔',
    titleColor: '#be123c',
    cardBorder: '#fecdd3',
    btnBg: '#ffe4e6',
    btnBorder: '#fda4af',
    btnText: '#9f1239',
    btnHoverBg: '#fecdd3',
    items: [
      { id: 'sec-dolor-pecho', name: 'Evaluación Dolor' },
      { id: 'sec-angina', name: 'Angina' },
      { id: 'sec-infarto', name: 'Infarto (IAM)' },
      { id: 'sec-embolia-pulmonar', name: 'Embolia Pulmonar' },
    ]
  },
  {
    id: 'cat-4',
    title: '4. FALTA DE AIRE',
    icon: '🫁',
    titleColor: '#0369a1',
    cardBorder: '#bae6fd',
    btnBg: '#e0f2fe',
    btnBorder: '#7dd3fc',
    btnText: '#0284c7',
    btnHoverBg: '#bae6fd',
    items: [
      { id: 'sec-falta-aire', name: 'Evaluación Falta Aire' },
      { id: 'sec-hiperventilacion', name: 'Hiperventilación' },
      { id: 'sec-asma', name: 'Asma' },
      { id: 'sec-epoc', name: 'EPOC' },
      { id: 'sec-icc', name: 'Insuf. Cardíaca' },
      { id: 'sec-obstruccion', name: 'Obstrucción Vía Aérea' },
    ]
  },
  {
    id: 'cat-5',
    title: '5. BRADICARDIA',
    icon: '📉',
    titleColor: '#b45309',
    cardBorder: '#fde68a',
    btnBg: '#fef3c7',
    btnBorder: '#fcd34d',
    btnText: '#92400e',
    btnHoverBg: '#fde68a',
    items: [
      { id: 'sec-bradicardia', name: 'Manejo Bradicardia' },
    ]
  },
  {
    id: 'cat-6',
    title: '6. TAQUICARDIA',
    icon: '📈',
    titleColor: '#b45309',
    cardBorder: '#fde68a',
    btnBg: '#fef3c7',
    btnBorder: '#fcd34d',
    btnText: '#92400e',
    btnHoverBg: '#fde68a',
    items: [
      { id: 'sec-taquicardia', name: 'Manejo Taquicardia' },
    ]
  },
  {
    id: 'cat-7',
    title: '7. HIPOTENSIÓN',
    icon: '🩸',
    titleColor: '#b45309',
    cardBorder: '#fde68a',
    btnBg: '#fef3c7',
    btnBorder: '#fcd34d',
    btnText: '#92400e',
    btnHoverBg: '#fde68a',
    items: [
      { id: 'sec-hipotension', name: 'Manejo Hipotensión' },
    ]
  },
  {
    id: 'cat-8',
    title: '8. REACCIÓN ALÉRGICA',
    icon: '⚠️',
    titleColor: '#c2410c',
    cardBorder: '#fed7aa',
    btnBg: '#ffedd5',
    btnBorder: '#fdba74',
    btnText: '#9a3412',
    btnHoverBg: '#fed7aa',
    items: [
      { id: 'sec-alergia-leve', name: 'Alergia Leve' },
      { id: 'sec-alergia-severa', name: 'Alergia Severa (Anafilaxia)' },
    ]
  },
  {
    id: 'cat-9',
    title: '9. ESTADO MENTAL ALTERADO',
    icon: '🧠',
    titleColor: '#6d28d9',
    cardBorder: '#e9d5ff',
    btnBg: '#f3e8ff',
    btnBorder: '#d8b4fe',
    btnText: '#5b21b6',
    btnHoverBg: '#e9d5ff',
    items: [
      { id: 'sec-estado-mental', name: 'Evaluación General' },
      { id: 'sec-desmayo-simple', name: 'Desmayo Simple' },
      { id: 'sec-hipoglucemia', name: 'Hipoglucemia' },
      { id: 'sec-acv', name: 'ACV' },
      { id: 'sec-convulsiones', name: 'Convulsiones' },
    ]
  },
];

interface Slide {
  id: string;
  title: string;
  category: string;
  categoryIcon: string;
  categoryColor: string;
  categoryBg: string;
  categoryBorder: string;
  content: string;
}

const CATEGORY_MAP: Record<string, { category: string; icon: string; color: string; bgLight: string; border: string }> = {
  'sec-guia-usuario': { category: '1. Preparación para Emergencias', icon: '📋', color: '#1e3a8a', bgLight: '#f0f9ff', border: '#bfdbfe' },
  'sec-roles-equipo': { category: '1. Preparación para Emergencias', icon: '📋', color: '#1e3a8a', bgLight: '#f0f9ff', border: '#bfdbfe' },
  'sec-equipo-farmacos': { category: '1. Preparación para Emergencias', icon: '📋', color: '#1e3a8a', bgLight: '#f0f9ff', border: '#bfdbfe' },

  'sec-paro-cardiopulmonar': { category: '2. Paro Cardiopulmonar', icon: '❤️', color: '#b91c1c', bgLight: '#fee2e2', border: '#fecaca' },
  'sec-paro-farmacos': { category: '2. Paro Cardiopulmonar', icon: '❤️', color: '#b91c1c', bgLight: '#fee2e2', border: '#fecaca' },

  'sec-dolor-pecho': { category: '3. Dolor en el Pecho', icon: '💔', color: '#be123c', bgLight: '#ffe4e6', border: '#fecdd3' },
  'sec-angina': { category: '3. Dolor en el Pecho', icon: '💔', color: '#be123c', bgLight: '#ffe4e6', border: '#fecdd3' },
  'sec-infarto': { category: '3. Dolor en el Pecho', icon: '💔', color: '#be123c', bgLight: '#ffe4e6', border: '#fecdd3' },
  'sec-embolia-pulmonar': { category: '3. Dolor en el Pecho', icon: '💔', color: '#be123c', bgLight: '#ffe4e6', border: '#fecdd3' },

  'sec-falta-aire': { category: '4. Falta de Aire', icon: '🫁', color: '#0369a1', bgLight: '#e0f2fe', border: '#bae6fd' },
  'sec-hiperventilacion': { category: '4. Falta de Aire', icon: '🫁', color: '#0369a1', bgLight: '#e0f2fe', border: '#bae6fd' },
  'sec-asma': { category: '4. Falta de Aire', icon: '🫁', color: '#0369a1', bgLight: '#e0f2fe', border: '#bae6fd' },
  'sec-epoc': { category: '4. Falta de Aire', icon: '🫁', color: '#0369a1', bgLight: '#e0f2fe', border: '#bae6fd' },
  'sec-icc': { category: '4. Falta de Aire', icon: '🫁', color: '#0369a1', bgLight: '#e0f2fe', border: '#bae6fd' },
  'sec-obstruccion': { category: '4. Falta de Aire', icon: '🫁', color: '#0369a1', bgLight: '#e0f2fe', border: '#bae6fd' },

  'sec-bradicardia': { category: '5. Bradicardia', icon: '📉', color: '#b45309', bgLight: '#fef3c7', border: '#fde68a' },
  'sec-taquicardia': { category: '6. Taquicardia', icon: '📈', color: '#b45309', bgLight: '#fef3c7', border: '#fde68a' },
  'sec-hipotension': { category: '7. Hipotensión', icon: '🩸', color: '#b45309', bgLight: '#fef3c7', border: '#fde68a' },

  'sec-alergia-leve': { category: '8. Reacción Alérgica', icon: '⚠️', color: '#c2410c', bgLight: '#ffedd5', border: '#fed7aa' },
  'sec-alergia-severa': { category: '8. Reacción Alérgica', icon: '⚠️', color: '#c2410c', bgLight: '#ffedd5', border: '#fed7aa' },

  'sec-estado-mental': { category: '9. Estado Mental Alterado', icon: '🧠', color: '#6d28d9', bgLight: '#f3e8ff', border: '#e9d5ff' },
  'sec-desmayo-simple': { category: '9. Estado Mental Alterado', icon: '🧠', color: '#6d28d9', bgLight: '#f3e8ff', border: '#e9d5ff' },
  'sec-hipoglucemia': { category: '9. Estado Mental Alterado', icon: '🧠', color: '#6d28d9', bgLight: '#f3e8ff', border: '#e9d5ff' },
  'sec-acv': { category: '9. Estado Mental Alterado', icon: '🧠', color: '#6d28d9', bgLight: '#f3e8ff', border: '#e9d5ff' },
  'sec-convulsiones': { category: '9. Estado Mental Alterado', icon: '🧠', color: '#6d28d9', bgLight: '#f3e8ff', border: '#e9d5ff' },
};

function extractSlides(mdContent: string): Slide[] {
  // Match only ## level-2 headings as individual slides
  const secRegex = /(?:<div id="(sec-[^"]+)"[^>]*><\/div>\s*\n\s*)?^##\s+(?!#)([^\n\r]+)/gm;
  let match;
  const indices: { start: number; id: string; title: string }[] = [];

  while ((match = secRegex.exec(mdContent)) !== null) {
    indices.push({
      start: match.index,
      id: match[1] || 'sec-' + match[2].toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: match[2].trim()
    });
  }

  const sections: Slide[] = [];
  for (let i = 0; i < indices.length; i++) {
    const curr = indices[i];
    const nextStart = (i + 1 < indices.length) ? indices[i + 1].start : mdContent.length;
    const body = mdContent.substring(curr.start, nextStart).trim();
    const meta = CATEGORY_MAP[curr.id] || {
      category: 'Información General',
      icon: '📄',
      color: '#475569',
      bgLight: '#f8fafc',
      border: '#e2e8f0'
    };
    sections.push({
      id: curr.id,
      title: curr.title,
      category: meta.category,
      categoryIcon: meta.icon,
      categoryColor: meta.color,
      categoryBg: meta.bgLight,
      categoryBorder: meta.border,
      content: body
    });
  }

  return sections;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function Protocols({ onLogout }: { onLogout?: () => void } = {}) {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number | null>(null);
  const [arrows, setArrows] = useState<ArrowLine[]>([]);
  const [svgDims, setSvgDims] = useState({ width: 0, height: 0 });
  const articleRef = useRef<HTMLElement>(null);
  const modalScrollRef = useRef<HTMLDivElement>(null);

  // Search filter in dashboard
  const [protocolSearch, setProtocolSearch] = useState('');

  // Admin Modal state
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminError, setAdminError] = useState('');
  const [usersList, setUsersList] = useState<Array<{ email: string; createdAt: string }>>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAdminAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError('');
    setIsLoadingUsers(true);

    try {
      const res = await fetch(`${API_URL}/auth/admin/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: adminPassword })
      });

      if (!res.ok) {
        throw new Error('Contraseña incorrecta');
      }

      const data = await res.json();
      setUsersList(data);
      setIsAdminAuthenticated(true);
    } catch (err: any) {
      setAdminError(err.message || 'Error al autenticar');
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const handleRefreshUsers = async () => {
    setIsLoadingUsers(true);
    try {
      const res = await fetch(`${API_URL}/auth/admin/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: adminPassword })
      });
      if (res.ok) {
        const data = await res.json();
        setUsersList(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const handleCloseAdminModal = () => {
    setShowAdminModal(false);
    setAdminPassword('');
    setIsAdminAuthenticated(false);
    setAdminError('');
    setSearchTerm('');
  };

  const computeArrows = useCallback(() => {
    if (!articleRef.current) return;
    const container = articleRef.current;
    const containerRect = container.getBoundingClientRect();
    const newArrows: ArrowLine[] = [];

    for (const cfg of ARROW_CONFIGS) {
      const fromEl = container.querySelector(`#${cfg.fromId}`) as HTMLElement | null;
      if (!fromEl) continue;
      const from = getAnchorPoint(fromEl, cfg.fromAnchor, containerRect);

      for (const target of cfg.targets) {
        const toEl = container.querySelector(`#${target.toId}`) as HTMLElement | null;
        if (!toEl) continue;
        const to = getAnchorPoint(toEl, target.toAnchor, containerRect);
        newArrows.push({ x1: from.x, y1: from.y, x2: to.x, y2: to.y });
      }
    }

    setSvgDims({ width: containerRect.width, height: containerRect.height });
    setArrows(newArrows);
  }, []);

  useEffect(() => {
    const fetchProtocols = () => {
      fetch(`/protocolos_traducidos.md?t=${new Date().getTime()}`)
        .then(res => {
          if (!res.ok) {
            return fetch(`/api/protocolos?t=${new Date().getTime()}`).then(r => r.text());
          }
          return res.text();
        })
        .then(text => {
          const parsed = extractSlides(text);
          setSlides(parsed);

          // Check if there is a hash matching a slide ID
          const hash = window.location.hash.replace('#', '');
          if (hash && parsed.length > 0) {
            const foundIdx = parsed.findIndex(s => s.id === hash);
            if (foundIdx !== -1) {
              setActiveSlideIndex(foundIdx);
            }
          }
        })
        .catch(err => console.error('Error cargando protocolos:', err));
    };

    fetchProtocols();
  }, []);

  // Centralized slide navigation ensuring URL hash and state remain in sync
  const goToSlide = useCallback((idx: number) => {
    if (idx >= 0 && idx < slides.length) {
      setActiveSlideIndex(idx);
      window.history.replaceState(null, '', `#${slides[idx].id}`);
    }
  }, [slides]);

  const openProtocolModalById = useCallback((id: string) => {
    const idx = slides.findIndex(s => s.id === id);
    if (idx !== -1) {
      goToSlide(idx);
    }
  }, [slides, goToSlide]);

  const closeProtocolModal = useCallback(() => {
    setActiveSlideIndex(null);
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
  }, []);

  // Listen to browser back/forward or hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && slides.length > 0) {
        const idx = slides.findIndex(s => s.id === hash);
        if (idx !== -1 && idx !== activeSlideIndex) {
          setActiveSlideIndex(idx);
        }
      } else if (!hash && activeSlideIndex !== null) {
        setActiveSlideIndex(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [slides, activeSlideIndex]);

  // Keyboard navigation for open modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showAdminModal) return;
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (activeSlideIndex !== null && slides.length > 0) {
        if (e.key === 'Escape') {
          e.preventDefault();
          closeProtocolModal();
        } else if (e.key === 'ArrowRight' || e.key === 'PageDown') {
          e.preventDefault();
          if (activeSlideIndex < slides.length - 1) {
            goToSlide(activeSlideIndex + 1);
          }
        } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
          e.preventDefault();
          if (activeSlideIndex > 0) {
            goToSlide(activeSlideIndex - 1);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides, showAdminModal, activeSlideIndex, goToSlide, closeProtocolModal]);

  // Recompute arrows when modal slide changes
  useEffect(() => {
    if (activeSlideIndex === null) {
      setArrows([]);
      return;
    }

    if (modalScrollRef.current) {
      modalScrollRef.current.scrollTop = 0;
    }

    const timer = setTimeout(computeArrows, 150);
    const timer2 = setTimeout(computeArrows, 500);
    window.addEventListener('resize', computeArrows);
    const resizeObserver = new ResizeObserver(() => computeArrows());
    if (articleRef.current) resizeObserver.observe(articleRef.current);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
      window.removeEventListener('resize', computeArrows);
      resizeObserver.disconnect();
    };
  }, [activeSlideIndex, computeArrows]);

  const currentSlide = activeSlideIndex !== null ? slides[activeSlideIndex] : null;

  return (
    <div className="min-h-screen bg-slate-50 py-4 sm:py-8 px-2 sm:px-4 md:px-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-5">
        {/* Main Header Bar */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <header className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3 sm:space-x-4 text-center sm:text-left">
              <img 
                src={logoImg} 
                alt="Facies Dentium Logo" 
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl shadow-md border-2 border-blue-400 bg-white object-cover shrink-0"
              />
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">Protocolos Clínicos</h2>
                <p className="text-blue-100 mt-0.5 text-xs sm:text-sm font-medium">
                  Facies Dentium - Guías oficiales de emergencias odontológicas
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap justify-center sm:justify-end">
              <button
                onClick={() => {
                  setShowAdminModal(true);
                  if (isAdminAuthenticated) {
                    handleRefreshUsers();
                  }
                }}
                className="bg-blue-500/80 hover:bg-blue-800 text-xs font-semibold px-3.5 py-2 rounded-full border border-blue-300 text-white shadow-sm whitespace-nowrap cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-1.5"
                title="Panel de Acceso Privado"
              >
                <span>🔒</span>
                <span>Acceso Privado</span>
              </button>

              <button
                onClick={() => {
                  if (onLogout) onLogout();
                  else window.location.reload();
                }}
                className="bg-white/15 hover:bg-white/25 text-xs font-semibold px-3.5 py-2 rounded-full border border-white/30 text-white shadow-sm whitespace-nowrap cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-1.5"
                title="Cerrar Sesión"
              >
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </header>
        </div>

        {/* ACCESO RÁPIDO POR PROTOCOLO CLÍNICO (Dashboard Principal) */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-4 sm:p-7 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">📑</span>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
                  Acceso Rápido por Protocolo Clínico
                </h1>
              </div>
              <p className="text-slate-500 text-xs sm:text-sm mt-1">
                Haz clic en cualquier categoría o protocolo para ver su contenido en ventana modal:
              </p>
            </div>

            {/* Quick Search */}
            <div className="relative w-full md:w-72">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Buscar protocolo..."
                value={protocolSearch}
                onChange={(e) => setProtocolSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              {protocolSearch && (
                <button
                  onClick={() => setProtocolSearch('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Grid de las 9 Categorías Principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-6">
            {PROTOCOL_DASHBOARD.map((cat) => {
              // Filter items if search is active
              const filteredItems = protocolSearch
                ? cat.items.filter(item => item.name.toLowerCase().includes(protocolSearch.toLowerCase()))
                : cat.items;

              if (protocolSearch && filteredItems.length === 0) return null;

              return (
                <div
                  key={cat.id}
                  style={{ borderColor: cat.cardBorder }}
                  className="rounded-2xl border bg-white p-4 sm:p-5 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow duration-200"
                >
                  <div>
                    {/* Header de Categoría */}
                    <div className="flex items-center gap-2 mb-3.5 pb-2.5 border-b border-slate-100">
                      <span className="text-base sm:text-lg">{cat.icon}</span>
                      <h2
                        className="text-xs sm:text-sm font-bold tracking-wide uppercase truncate"
                        style={{ color: cat.titleColor }}
                      >
                        {cat.title}
                      </h2>
                    </div>

                    {/* Botones de Protocolos de la Categoría */}
                    <div className="flex flex-wrap gap-2">
                      {filteredItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => openProtocolModalById(item.id)}
                          style={{
                            backgroundColor: cat.btnBg,
                            borderColor: cat.btnBorder,
                            color: cat.btnText,
                          }}
                          className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all duration-150 hover:scale-[1.03] active:scale-95 hover:shadow-xs cursor-pointer text-left"
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 font-medium">
            <span>Facies Dentium © 2026 - Guía Rápida de Emergencias</span>
            <span>Haz clic en cualquier protocolo para ver su algoritmo clínico</span>
          </div>
        </div>

        {/* Footer Logout Button */}
        <div className="mt-6 text-center">
          <button 
            onClick={() => {
              if (onLogout) onLogout();
              else window.location.reload();
            }} 
            className="text-gray-500 hover:text-gray-700 text-xs font-medium transition-colors cursor-pointer"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MODAL DEL PROTOCOLO CLÍNICO / GUÍA SELECCIONADA           */}
      {/* ========================================================= */}
      {activeSlideIndex !== null && currentSlide && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200">
            {/* Header del Modal */}
            <div
              className="px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3 border-b border-slate-200 shrink-0"
              style={{ backgroundColor: currentSlide.categoryBg }}
            >
              <div className="flex items-center gap-2.5 overflow-hidden">
                <span className="text-xl">{currentSlide.categoryIcon}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[11px] sm:text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/70 border border-slate-200 truncate"
                      style={{ color: currentSlide.categoryColor }}
                    >
                      {currentSlide.category}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
                      ({activeSlideIndex + 1} de {slides.length})
                    </span>
                  </div>
                  <h2 className="text-base sm:text-xl font-bold text-slate-900 truncate mt-0.5">
                    {currentSlide.title}
                  </h2>
                </div>
              </div>

              {/* Botones de Control del Modal */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => goToSlide(activeSlideIndex - 1)}
                  disabled={activeSlideIndex === 0}
                  className="p-2 bg-white/80 hover:bg-white text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl border border-slate-200 shadow-2xs transition-all cursor-pointer"
                  title={activeSlideIndex > 0 ? `Protocolo Anterior: ${slides[activeSlideIndex - 1].title}` : 'Primer Protocolo'}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={() => goToSlide(activeSlideIndex + 1)}
                  disabled={activeSlideIndex === slides.length - 1}
                  className="p-2 bg-white/80 hover:bg-white text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl border border-slate-200 shadow-2xs transition-all cursor-pointer"
                  title={activeSlideIndex < slides.length - 1 ? `Siguiente Protocolo: ${slides[activeSlideIndex + 1].title}` : 'Último Protocolo'}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <button
                  onClick={closeProtocolModal}
                  className="p-2 bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 rounded-xl border border-slate-300 shadow-2xs transition-all cursor-pointer ml-1"
                  title="Cerrar (Esc)"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Cuerpo del Modal con Contenido Markdown y Flechas SVG */}
            <div ref={modalScrollRef} className="overflow-y-auto px-4 sm:px-6 md:px-8 pt-2 pb-6 flex-1 bg-white">
              <div className="overflow-x-auto pb-4">
                <div style={{ position: 'relative', minWidth: '680px' }}>
                  <article
                    ref={articleRef}
                    className="prose prose-blue prose-lg max-w-none prose-headings:font-bold prose-a:text-blue-600 prose-h2:mt-1 prose-h2:pt-0 prose-h2:mb-3 prose-h3:mt-3 prose-h3:mb-2 prose-p:my-1.5 prose-ul:my-1.5 prose-li:my-0.5"
                  >
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>{currentSlide.content}</ReactMarkdown>
                  </article>

                  {/* Overlay de Flechas SVG Dinámicas */}
                  {arrows.length > 0 && (
                    <svg
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: svgDims.width,
                        height: svgDims.height,
                        pointerEvents: 'none',
                        overflow: 'visible',
                      }}
                    >
                      <defs>
                        <marker
                          id="arrowhead-dyn"
                          markerWidth="10"
                          markerHeight="7"
                          refX="10"
                          refY="3.5"
                          orient="auto"
                        >
                          <polygon points="0 0, 10 3.5, 0 7" fill="black" />
                        </marker>
                      </defs>
                      {arrows.map((a, i) => (
                        <line
                          key={i}
                          x1={a.x1}
                          y1={a.y1}
                          x2={a.x2}
                          y2={a.y2}
                          stroke="black"
                          strokeWidth="2.5"
                          markerEnd="url(#arrowhead-dyn)"
                        />
                      ))}
                    </svg>
                  )}
                </div>
              </div>
            </div>

            {/* Footer del Modal */}
            <div className="bg-slate-50 border-t border-slate-200 p-3 sm:p-4 flex items-center justify-between gap-2 sm:gap-4 shrink-0">
              <button
                onClick={() => goToSlide(activeSlideIndex - 1)}
                disabled={activeSlideIndex === 0}
                title={activeSlideIndex > 0 ? `Protocolo anterior: ${slides[activeSlideIndex - 1].title}` : 'Primer protocolo'}
                className="px-3.5 sm:px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed font-semibold text-xs sm:text-sm rounded-xl border border-slate-300 shadow-2xs transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                </svg>
                <span>Anterior</span>
              </button>

              {/* Selector de Protocolo Directo */}
              <div className="relative flex-1 max-w-md min-w-0">
                <select
                  value={activeSlideIndex}
                  onChange={(e) => goToSlide(Number(e.target.value))}
                  className="w-full appearance-none bg-white border border-slate-300 text-slate-800 font-bold text-xs sm:text-sm py-2 pl-3 pr-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer text-center truncate shadow-2xs"
                >
                  {slides.map((s, idx) => (
                    <option key={s.id} value={idx}>
                      {idx + 1}. {s.title}
                    </option>
                  ))}
                </select>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none text-slate-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </div>

              <button
                onClick={() => goToSlide(activeSlideIndex + 1)}
                disabled={activeSlideIndex === slides.length - 1}
                title={activeSlideIndex < slides.length - 1 ? `Siguiente protocolo: ${slides[activeSlideIndex + 1].title}` : 'Último protocolo'}
                className="px-3.5 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-30 disabled:cursor-not-allowed font-semibold text-xs sm:text-sm rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
              >
                <span>Siguiente</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* Modal de Acceso Privado / Lista de Usuarios               */}
      {/* ========================================================= */}
      {showAdminModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-gray-200 animate-in zoom-in-95 duration-200">
            {/* Header del Modal */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-5 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                  <span className="text-xl">🔐</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold">Panel de Acceso Privado</h3>
                  <p className="text-blue-100 text-xs">
                    {isAdminAuthenticated ? 'Registro de correos y fechas de acceso' : 'Verificación de seguridad'}
                  </p>
                </div>
              </div>
              <button
                onClick={handleCloseAdminModal}
                className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-colors cursor-pointer"
                title="Cerrar"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Contenido del Modal */}
            <div className="p-6">
              {!isAdminAuthenticated ? (
                /* Pantalla de ingreso de contraseña */
                <form onSubmit={handleAdminAuth} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="admin-pass">
                      Contraseña de Administrador
                    </label>
                    <input
                      id="admin-pass"
                      type="password"
                      placeholder="Ingresa la contraseña..."
                      value={adminPassword}
                      onChange={(e) => {
                        setAdminPassword(e.target.value);
                        if (adminError) setAdminError('');
                      }}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 transition-all"
                      autoFocus
                      required
                    />
                  </div>

                  {adminError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                      <span>⚠️</span>
                      <span>{adminError}</span>
                    </div>
                  )}

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleCloseAdminModal}
                      className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium text-sm transition-colors cursor-pointer flex items-center gap-2"
                    >
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span>Cancelar</span>
                    </button>
                    <button
                      type="submit"
                      disabled={isLoadingUsers}
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md transition-all cursor-pointer disabled:bg-blue-400 flex items-center gap-2"
                    >
                      {isLoadingUsers ? (
                        <svg className="w-4 h-4 animate-spin text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                      )}
                      <span>{isLoadingUsers ? 'Verificando...' : 'Acceder'}</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* Pantalla de Lista de Usuarios */
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-2 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-700">Usuarios Registrados:</span>
                      <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                        {usersList.length}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <div className="relative w-full sm:w-56">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none text-gray-400">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </span>
                        <input
                          type="text"
                          placeholder="Buscar correo..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <button
                        onClick={handleRefreshUsers}
                        disabled={isLoadingUsers}
                        className="px-3 py-1.5 text-xs font-medium text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 border border-blue-200"
                        title="Actualizar lista"
                      >
                        <svg className={`w-3.5 h-3.5 ${isLoadingUsers ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span>Actualizar</span>
                      </button>
                    </div>
                  </div>

                  {/* Tabla de Usuarios */}
                  <div className="max-h-80 overflow-y-auto rounded-xl border border-gray-200 shadow-inner">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-gray-50 text-gray-700 font-semibold text-xs uppercase tracking-wider sticky top-0 border-b border-gray-200">
                        <tr>
                          <th className="px-4 py-3">Email</th>
                          <th className="px-4 py-3">Fecha de Registro</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {usersList.filter(u => u.email.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 ? (
                          <tr>
                            <td colSpan={2} className="px-4 py-8 text-center text-gray-400 text-sm">
                              {searchTerm ? 'No se encontraron correos con ese filtro' : 'No hay usuarios registrados aún'}
                            </td>
                          </tr>
                        ) : (
                          usersList
                            .filter(u => u.email.toLowerCase().includes(searchTerm.toLowerCase()))
                            .map((u, idx) => (
                              <tr key={idx} className="hover:bg-blue-50/50 transition-colors">
                                <td className="px-4 py-3 font-medium text-gray-900 flex items-center gap-2">
                                  <span className="text-blue-500">✉️</span>
                                  <span>{u.email}</span>
                                </td>
                                <td className="px-4 py-3 text-gray-600 text-xs">
                                  {new Date(u.createdAt).toLocaleString('es-ES', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </td>
                              </tr>
                            ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={handleCloseAdminModal}
                      className="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm transition-colors cursor-pointer flex items-center gap-2"
                    >
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span>Cerrar</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
