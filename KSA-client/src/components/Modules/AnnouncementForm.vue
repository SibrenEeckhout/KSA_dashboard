<template>
  <dialog open>
    <h2>Voeg een nieuwe aankondiging toe.</h2>
  <form id="announcementForm" @submit.prevent="submitForm">
    <div class="flexRow">
      <div>
        <label for="datum">Datum:</label>
        <input id="datum" type="date" v-model="formData.date">
      </div>
      <div>
        <label for="targetGroup">Group:</label>
        <select id="targetGroup" v-model="formData.targetGroup">
          <option selected value="">Kies een groep</option>
          <option v-for="group in groupNames" :key="group.name" :value="group.name">{{ group.name }}</option>
      </select>
    </div>
    </div>

    <translation-field label="Nederlandse titel" message-label="Nederlands bericht" lang="nl" name="nederlands" :form-data="formData" :required=true />
    <translation-field label="Engelse titel" message-label="Engels bericht" lang="en" name="engels" :form-data="formData" :required=false />
    <translation-field label="Franse titel" message-label="Frans bericht " lang="fr" name="frans" :form-data="formData" :required=false />
    <div id="formActions">
      <button type="button" @click="$emit('cancel')">Annuleren</button>
      <button type="submit" >Toevoegen</button>
    </div>
  </form>
  </dialog>

</template>

<script>
import TranslationField from './TranslationField.vue'
export default {
  name: "AnnouncementForm",
  components: {
    TranslationField
  },
  props : {
    groupNames: {
      type: Array,
      required: true
    },
    announcement: {
      type: Object,
      default: null
    }
  },
  data() {
  return {
    formData: {
      date: this.announcement?.date || "",
      targetGroup: this.announcement?.targetGroup || "",
      creatorId: 1,
      translations: {
        nl: { title: this.announcement?.translations?.nl?.title || '', message: this.announcement?.translations?.nl?.message || '' },
        en: { title: this.announcement?.translations?.en?.title || '', message: this.announcement?.translations?.en?.message || '' },
        fr: { title: this.announcement?.translations?.fr?.title || '', message: this.announcement?.translations?.fr?.message || '' },
      },
    },
  };
},
  methods: {
    submitForm() {
      if (this.announcement !== null){
        this.$emit("post", { id: this.announcement.id, data: this.formData });
      }
      this.$emit("post", this.formData);
    },
  },
};
</script>

<style>
  button{
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    border: none;
    cursor: pointer;
  }
  button:first-of-type{
    background-color: #c5c5c5;
    color: #fff;
  }
  button:last-of-type{
    background-color: #0c8dea;
    color: #fff;
  }

  dialog{
    padding: 2rem;
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 100;
    border: 0.1rem solid #c5c5c5;
    border-radius: 0.5rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  #formActions{
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 1rem;
  }

  #announcementForm #formActions button{
    scale: 1;
  }

  dialog h2{
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }

  #announcementForm {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    margin: 0 auto;
    max-width: 28rem;
}

#announcementForm input, #announcementForm  select, #announcementForm textarea {
    width: 100%;
    margin-bottom: 1rem;
    padding: 1rem;
    border-radius: 0.5rem;
    border: 0.1rem solid #c5c5c5;
    resize: none;
    outline: none;
    transition: all 0.2s;
  }

  #announcementForm input[type=date], #announcementForm select {
    padding-right: 2.2rem;
  }

  #announcementForm .flexRow{
    width: 100%;
  }


</style>
