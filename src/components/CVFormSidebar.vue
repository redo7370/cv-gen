<script setup lang="ts">
import { useCVStore } from '@/composables/useCVStore'
import { useLanguage } from '@/composables/useLanguage'
import PersonalDataForm from './PersonalDataForm.vue'

const {
  ausbildungen,
  berufserfahrungen,
  kurse,
  auszeichnungen,
  kenntnisse,
  sprachen,
  interessen,
  isSPADark,
  dateErrors,
  addAusbildung,
  removeAusbildung,
  addBerufserfahrung,
  removeBerufserfahrung,
  addKurs,
  removeKurs,
  addAuszeichnung,
  removeAuszeichnung,
  addSprache,
  removeSprache,
} = useCVStore()

const { t } = useLanguage()
</script>

<template>
  <div class="form-section" :class="{ dark: isSPADark }">
    <PersonalDataForm />

    <!-- Ausbildung -->
    <h2 class="section-title">{{ t.form.education }}</h2>
    <div
      class="dynamic-item"
      v-for="item in ausbildungen"
      :key="item.id"
      :class="{ 'has-date-error': dateErrors.has(item.id) }"
    >
      <button class="btn btn-remove" @click="removeAusbildung(item.id)">✕</button>
      <div class="form-group">
        <label>{{ t.form.degreeTitle }}</label>
        <input type="text" v-model="item.title" :placeholder="t.form.degreePlaceholder" />
      </div>
      <div class="form-group">
        <label>{{ t.form.institution }}</label>
        <input type="text" v-model="item.subtitle" :placeholder="t.form.institutionPlaceholder" />
      </div>
      <div class="two-column">
        <div class="form-group">
          <label>{{ t.form.from }}</label>
          <input type="text" v-model="item.dateFrom" :placeholder="t.form.fromPlaceholder" />
        </div>
        <div class="form-group">
          <label>{{ t.form.to }}</label>
          <input type="text" v-model="item.dateTo" :placeholder="t.form.toPlaceholder" />
        </div>
      </div>
      <div v-if="dateErrors.has(item.id)" class="date-error-message">
        ⚠️ {{ t.form.dateError }}
      </div>
      <div class="form-group">
        <label>{{ t.form.description }}</label>
        <textarea v-model="item.description" :placeholder="t.form.descriptionPlaceholder"></textarea>
      </div>
    </div>
    <button class="btn btn-add" @click="addAusbildung">{{ t.form.addEducation }}</button>

    <!-- Berufserfahrung -->
    <h2 class="section-title">{{ t.form.workExperience }}</h2>
    <div
      class="dynamic-item"
      v-for="item in berufserfahrungen"
      :key="item.id"
      :class="{ 'has-date-error': dateErrors.has(item.id) }"
    >
      <button class="btn btn-remove" @click="removeBerufserfahrung(item.id)">✕</button>
      <div class="form-group">
        <label>{{ t.form.position }}</label>
        <input type="text" v-model="item.title" :placeholder="t.form.positionPlaceholder" />
      </div>
      <div class="form-group">
        <label>{{ t.form.company }}</label>
        <input type="text" v-model="item.subtitle" :placeholder="t.form.companyPlaceholder" />
      </div>
      <div class="two-column">
        <div class="form-group">
          <label>{{ t.form.from }}</label>
          <input type="text" v-model="item.dateFrom" :placeholder="t.form.workFromPlaceholder" />
        </div>
        <div class="form-group">
          <label>{{ t.form.to }}</label>
          <input type="text" v-model="item.dateTo" :placeholder="t.form.workToPlaceholder" />
        </div>
      </div>
      <div v-if="dateErrors.has(item.id)" class="date-error-message">
        ⚠️ {{ t.form.dateError }}
      </div>
      <div class="form-group">
        <label>{{ t.form.description }}</label>
        <textarea
          v-model="item.description"
          :placeholder="t.form.workDescriptionPlaceholder"
        ></textarea>
      </div>
    </div>
    <button class="btn btn-add" @click="addBerufserfahrung">{{ t.form.addWorkExperience }}</button>

    <!-- Kurse/Zertifikate -->
    <h2 class="section-title">{{ t.form.courses }}</h2>
    <div class="dynamic-item" v-for="item in kurse" :key="item.id">
      <button class="btn btn-remove" @click="removeKurs(item.id)">✕</button>
      <div class="form-group">
        <label>{{ t.form.courseCertificate }}</label>
        <input type="text" v-model="item.title" placeholder="AWS Certified Solutions Architect" />
      </div>
      <div class="form-group">
        <label>{{ t.form.provider }}</label>
        <input type="text" v-model="item.anbieter" :placeholder="t.form.providerPlaceholder" />
      </div>
      <div class="form-group">
        <label>{{ t.form.date }}</label>
        <input type="text" v-model="item.datum" :placeholder="t.form.datePlaceholder" />
      </div>
    </div>
    <button class="btn btn-add" @click="addKurs">{{ t.form.addCourse }}</button>

    <!-- Auszeichnungen -->
    <h2 class="section-title">{{ t.form.awards }}</h2>
    <div class="dynamic-item" v-for="item in auszeichnungen" :key="item.id">
      <button class="btn btn-remove" @click="removeAuszeichnung(item.id)">✕</button>
      <div class="form-group">
        <label>{{ t.form.award }}</label>
        <input type="text" v-model="item.title" :placeholder="t.form.awardPlaceholder" />
      </div>
      <div class="form-group">
        <label>{{ t.form.awardedBy }}</label>
        <input type="text" v-model="item.verliehen" :placeholder="t.form.awardedByPlaceholder" />
      </div>
      <div class="form-group">
        <label>{{ t.form.date }}</label>
        <input type="text" v-model="item.datum" :placeholder="t.form.awardDatePlaceholder" />
      </div>
    </div>
    <button class="btn btn-add" @click="addAuszeichnung">{{ t.form.addAward }}</button>

    <!-- Kenntnisse -->
    <h2 class="section-title">{{ t.form.skills }}</h2>
    <div class="form-group">
      <label>{{ t.form.skillsLabel }}</label>
      <textarea
        v-model="kenntnisse"
        :placeholder="t.form.skillsPlaceholder"
      ></textarea>
    </div>

    <!-- Sprachen -->
    <h2 class="section-title">{{ t.form.languages }}</h2>
    <div class="dynamic-item" v-for="item in sprachen" :key="item.id">
      <button class="btn btn-remove" @click="removeSprache(item.id)">✕</button>
      <div class="form-group">
        <label>{{ t.form.language }}</label>
        <input type="text" v-model="item.sprache" :placeholder="t.form.languagePlaceholder" />
      </div>
      <div class="form-group">
        <label>{{ t.form.level }}</label>
        <select v-model="item.niveau" class="niveau-select">
          <option :value="1">{{ t.form.levels[1] }}</option>
          <option :value="2">{{ t.form.levels[2] }}</option>
          <option :value="3">{{ t.form.levels[3] }}</option>
          <option :value="4">{{ t.form.levels[4] }}</option>
          <option :value="5">{{ t.form.levels[5] }}</option>
          <option :value="6">{{ t.form.levels[6] }}</option>
        </select>
      </div>
    </div>
    <button class="btn btn-add" @click="addSprache">{{ t.form.addLanguage }}</button>

    <!-- Interessen -->
    <h2 class="section-title">{{ t.form.interests }}</h2>
    <div class="form-group">
      <label>{{ t.form.interestsLabel }}</label>
      <textarea v-model="interessen" :placeholder="t.form.interestsPlaceholder"></textarea>
    </div>
  </div>
</template>

<style scoped>
.form-section {
  width: 420px;
  padding: 25px;
  background: white;
  overflow-y: auto;
  flex-shrink: 0;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

.form-section.dark {
  background: #1e293b;
  color: #f1f5f9;
}

.section-title {
  font-size: 1.5em;
  color: #2d3748;
  margin: 30px 0 20px 0;
  padding-bottom: 10px;
  border-bottom: 2px solid #2d3748;
  transition:
    color 0.3s ease,
    border-color 0.3s ease;
}

.form-section.dark .section-title {
  color: #e2e8f0;
  border-bottom-color: #64748b;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  color: #1e293b;
  transition: color 0.3s ease;
}

.form-section.dark .form-group label {
  color: #f1f5f9;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 2px solid #cbd5e0;
  border-radius: 5px;
  font-size: 14px;
  background: white;
  color: #1e293b;
  transition:
    border-color 0.3s,
    background-color 0.3s,
    color 0.3s;
}

.form-section.dark .form-group input,
.form-section.dark .form-group textarea {
  background: #334155;
  border-color: #475569;
  color: #f1f5f9;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #2d3748;
}

.form-section.dark .form-group input:focus,
.form-section.dark .form-group textarea:focus {
  border-color: #64748b;
  background: #475569;
}

.form-group textarea {
  resize: vertical;
  min-height: 60px;
}

.two-column {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.dynamic-item {
  background: #f8fafc;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 10px;
  border: 1px solid #cbd5e0;
  position: relative;
  transition: all 0.3s ease;
}

.form-section.dark .dynamic-item {
  background: #334155;
  border-color: #475569;
}

.dynamic-item.has-date-error {
  border-color: #dc3545;
  background: #fff5f5;
  box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
}

.form-section.dark .dynamic-item.has-date-error {
  background: #4a2020;
  border-color: #ff6b6b;
}

.date-error-message {
  background: #dc3545;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  margin-top: 10px;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  animation: shake 0.5s ease;
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s;
}

.btn-add {
  background: #28a745;
  color: white;
  margin-top: 10px;
}

.btn-add:hover {
  background: #218838;
}

.btn-remove {
  background: #dc3545;
  color: white;
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  font-size: 12px;
}

.btn-remove:hover {
  background: #c82333;
}

.niveau-select {
  width: 100%;
  padding: 10px;
  border: 2px solid #cbd5e0;
  border-radius: 5px;
  font-size: 14px;
  background: white;
  color: #1e293b;
  cursor: pointer;
  transition:
    background-color 0.3s,
    border-color 0.3s,
    color 0.3s;
}

.form-section.dark .niveau-select {
  background: #334155;
  border-color: #475569;
  color: #f1f5f9;
}

/* Dark mode for photo components inherited via parent class */
.form-section.dark :deep(.photo-preview) {
  border-color: #64748b;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
}

.form-section.dark :deep(.photo-upload-placeholder) {
  border-color: #64748b;
  background: #334155;
}

.form-section.dark :deep(.photo-upload-placeholder:hover) {
  border-color: #94a3b8;
  background: #475569;
}

.form-section.dark :deep(.photo-upload-label span:last-child) {
  color: #cbd5e0;
}

.form-section.dark :deep(.section-title) {
  color: #e2e8f0;
  border-bottom-color: #64748b;
}

@media (max-width: 968px) {
  .form-section {
    width: 100%;
  }

  .two-column {
    grid-template-columns: 1fr;
  }
}
</style>
