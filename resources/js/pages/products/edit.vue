<template>
  <div class="row">
    <div class="col-md-8 mb-3">
      <card :title="$t('product')" class="product-card">
        <div class="row m-4">
          <div v-if="!isLoading" class="col-md-12">
            <form @submit.prevent="edit" @keydown="form.onKeydown($event)">
              <AlertError :form="form">{{ messages }} </AlertError>
              <!-- Name -->
              <div class="mb-3 row">
                <label class="col-md-3 col-form-label text-md-end">{{
                  $t("name")
                }}</label>
                <div class="col-md-9">
                  <input
                    v-model="form.name"
                    :class="{ 'is-invalid': form.errors.has('name') }"
                    class="form-control"
                    type="text"
                    name="name"
                  />
                  <has-error :form="form" field="name" />
                </div>
              </div>

              <!-- Description -->
              <div class="mb-3 row">
                <label class="col-md-3 col-form-label text-md-end">{{
                  $t("description")
                }}</label>
                <div class="col-md-9">
                  <textarea
                    v-model="form.description"
                    :class="{ 'is-invalid': form.errors.has('description') }"
                    class="form-control"
                    name="description"
                  >
                  </textarea>
                  <has-error :form="form" field="description" />
                </div>
              </div>

              <!-- Price -->
              <div class="mb-3 row">
                <label class="col-md-3 col-form-label text-md-end">{{
                  $t("price")
                }}</label>
                <div class="col-md-9">
                  <input
                    v-model="form.price"
                    :class="{ 'is-invalid': form.errors.has('price') }"
                    class="form-control"
                    type="number"
                    min="0"
                    max="9999999999"
                    name="price"
                  />
                  <has-error :form="form" field="price" />
                </div>
              </div>

              <!-- Stock -->
              <div class="mb-3 row">
                <label class="col-md-3 col-form-label text-md-end">{{
                  $t("stock")
                }}</label>
                <div class="col-md-9">
                  <input
                    v-model="form.stock"
                    :class="{ 'is-invalid': form.errors.has('stock') }"
                    class="form-control"
                    type="number"
                    step="any"
                    min="0"
                    max="999999"
                    name="stock"
                  />
                  <has-error :form="form" field="stock" />
                </div>
              </div>

              <div class="mb-3 row">
                <div class="col-md-9 offset-md-3">
                  <!-- Submit Button -->
                  <v-button :loading="form.busy">
                    {{ $t("edit") }}
                  </v-button>
                  <router-link
                    :to="{ name: 'products.index' }"
                    class="btn btn-outline-secondary ml-2"
                  >
                    {{ $t("cancel") }}
                  </router-link>
                </div>
              </div>
            </form>
          </div>
          <div v-else class="text-center">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Form from "vform";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default {
  middleware: "auth",
  metaInfo() {
    return { title: this.$t("product") };
  },
  data() {
    return {
      form: new Form({
        name: "",
        description: "",
        price: "",
        stock: "",
      }),
      messages: null,
      isLoading: true,
    };
  },

  mounted() {
    axios
      .get(`/api/product/${this.$route.params.id}`)
      .then((response) => {
        let data = response.data.data;
        this.form.name = data.name;
        this.form.description = data.description;
        this.form.price = data.price;
        this.form.stock = data.stock;
      })
      .finally(() => {
        this.isLoading = false;
      });
  },

  methods: {
    async edit() {
      try {
        // Submit the form.
        const { data } = await this.form.put(
          `/api/product/${this.$route.params.id}`
        );

        Swal.fire({
          icon: "success",
          title: this.$t("success_alert_title"),
          text: data.message,
          confirmButtonText: this.$t("ok"),
        }).then(() => {
          // Redirect product.
          this.redirect();
        });
      } catch (error) {
        this.messages = error.response.data.message;
      }
    },
    redirect() {
      this.$router.push({ name: "products" });
    },
  },
};
</script>

<style>
.product-card .card-body {
  padding: 16px;
}
</style>
