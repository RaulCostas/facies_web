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
    fromId: 'bradicardia-sintomas',
    fromAnchor: 'bradicardia-sym-orange',
    targets: [
      { toId: 'bradicardia-manejo', toAnchor: 'bradicardia-mgmt-pulse' },
    ]
  },
  {
    fromId: 'bradicardia-sintomas',
    fromAnchor: 'bradicardia-sym-red',
    targets: [
      { toId: 'bradicardia-manejo', toAnchor: 'bradicardia-mgmt-iv' },
    ]
  },
  {
    fromId: 'bradicardia-frecuencia',
    fromAnchor: 'bradicardia-rate-under40',
    targets: [
      { toId: 'bradicardia-manejo', toAnchor: 'bradicardia-mgmt-atropine' },
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
      { toId: 'mental-neurologico-target', toAnchor: 'mental-neurologico-tgt' },
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
    case 'paro-row-dentist':
      return { x: r.right - containerRect.left, y: r.top - containerRect.top + (r.height * 0.50) };
    case 'paro-row-assistant':
      return { x: r.right - containerRect.left, y: r.top - containerRect.top + (r.height * 0.88) };
    case 'paro-row-office':
      return { x: r.right - containerRect.left, y: r.top - containerRect.top + (r.height * 0.88) };
    case 'dentist-bottom-left':
      return { x: r.left - containerRect.left, y: r.bottom - containerRect.top - 10 };
    case 'assistant-bottom-left':
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.50) };
    case 'office-mid-left':
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.50) };
    // Drug Protocol anchors
    case 'shockable-row':
      return { x: r.right - containerRect.left, y: r.top - containerRect.top + (r.height * 0.42) };
    case 'target-shockable':
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.10) };
    case 'non-shockable-row':
      return { x: r.right - containerRect.left, y: r.top - containerRect.top + (r.height * 0.80) };
    case 'target-non-shockable':
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.08) };
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
      return { x: r.right - containerRect.left, y: r.top - containerRect.top + (r.height * 0.50) };
    case 'angina-mgmt-target':
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.22) };
    // Infarction anchors
    case 'infarto-symptoms-mid-right':
      return { x: r.right - containerRect.left, y: r.top - containerRect.top + (r.height * 0.50) };
    case 'infarto-mgmt-target':
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.22) };
    // Pulmonary Embolism anchors
    case 'embolia-symptoms-mid-right':
      return { x: r.right - containerRect.left, y: r.top - containerRect.top + (r.height * 0.50) };
    case 'embolia-mgmt-target':
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.40) };
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
      return { x: r.right - containerRect.left, y: r.top - containerRect.top + (r.height * 0.50) };
    case 'asma-mgmt-target':
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.28) };
    // COPD anchors
    case 'epoc-symptoms-mid-right':
      return { x: r.right - containerRect.left, y: r.top - containerRect.top + (r.height * 0.50) };
    case 'epoc-mgmt-target':
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.28) };
    // Congestive Heart Failure anchors
    case 'icc-symptoms-mid-right':
      // Right border of "Síntomas" box, vertical center
      return { x: r.right - containerRect.left, y: r.top - containerRect.top + (r.height * 0.50) };
    case 'icc-mgmt-target':
      // Left border of "Manejo de Emergencia de la Insuficiencia...", aligned straight/horizontal
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.32) };
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
      // Left border of right table at row 4 ("Monitoree la presión arterial y el pulso")
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.36) };
    case 'bradicardia-sym-red':
      // Right border of row 2 ("Pérdida del conocimiento")
      return { x: r.right - containerRect.left, y: r.top - containerRect.top + (r.height * 0.85) };
    case 'bradicardia-mgmt-iv':
      // Left border of right table directly at row 5 ("Inicie acceso IV o IO si está capacitado")
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.54) };
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
      return { x: r.left - containerRect.left, y: r.top - containerRect.top + (r.height * 0.20) };
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

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function Protocols({ onLogout }: { onLogout?: () => void } = {}) {
  const [content, setContent] = useState<string>('');
  const [arrows, setArrows] = useState<ArrowLine[]>([]);
  const [svgDims, setSvgDims] = useState({ width: 0, height: 0 });
  const articleRef = useRef<HTMLElement>(null);

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
        .then(text => setContent(text))
        .catch(err => setContent('# Error cargando protocolos: ' + err));
    };

    fetchProtocols();
    const interval = setInterval(fetchProtocols, 15000);
    return () => clearInterval(interval);
  }, []);

  // Recompute arrows after content renders and on resize
  useEffect(() => {
    if (!content) return;
    // Small delay to allow DOM to settle after ReactMarkdown renders
    const timer = setTimeout(computeArrows, 300);
    const timer2 = setTimeout(computeArrows, 1000);
    window.addEventListener('resize', computeArrows);
    const resizeObserver = new ResizeObserver(() => computeArrows());
    if (articleRef.current) resizeObserver.observe(articleRef.current);
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
      window.removeEventListener('resize', computeArrows);
      resizeObserver.disconnect();
    };
  }, [content, computeArrows]);

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-10 px-2 sm:px-4 md:px-6 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <header className="bg-blue-600 text-white p-4 sm:p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3 sm:space-x-4 text-center sm:text-left">
              <img 
                src={logoImg} 
                alt="Facies Dentium Logo" 
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl shadow-md border-2 border-blue-400 bg-white object-cover shrink-0"
              />
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">Protocolos Clínicos</h2>
                <p className="text-blue-100 mt-1 text-xs sm:text-sm md:text-base font-medium">
                  Facies Dentium - Guías oficiales de usuario
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
                className="bg-blue-500/80 hover:bg-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-blue-400 text-white shadow-sm whitespace-nowrap cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-1.5"
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
                className="bg-white/15 hover:bg-white/25 text-xs font-semibold px-3 py-1.5 rounded-full border border-white/30 text-white shadow-sm whitespace-nowrap cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-1.5"
                title="Cerrar Sesión"
              >
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </header>
          
          <div className="p-3 sm:p-6 md:p-10">
            <div className="overflow-x-auto pb-4">
              <div style={{ position: 'relative', minWidth: '680px' }}>
                <article
                  ref={articleRef}
                  className="prose prose-blue prose-lg max-w-none prose-headings:font-bold prose-a:text-blue-600"
                >
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
                </article>

                {/* Dynamic SVG arrow overlay */}
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
        </div>
        
        <div className="mt-8 text-center">
          <button 
            onClick={() => {
              if (onLogout) onLogout();
              else window.location.reload();
            }} 
            className="text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors cursor-pointer"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Floating Back to Top / Navigation button */}
      <a
        href="#sec-acceso-rapido"
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3.5 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 z-40 border border-white/20"
        title="Volver a Acceso Rápido por Protocolo Clínico"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </a>

      {/* Modal de Acceso Privado / Lista de Usuarios */}
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
