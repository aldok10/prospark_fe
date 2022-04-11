<template>
  <div class="row">
    <div class="col-md-8 mb-3">
      <card :title="$t('product')" class="product-card">
        <div class="row m-4">
          <div class="col-md-12">
            <form @submit.prevent="add" @keydown="form.onKeydown($event)">
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
                    {{ $t("add") }}
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
        </div>
      </card>
    </div>
  </div>
</template>

<script>
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
      isLoading: false,
    };
  },

  mounted() {},

  methods: {
    async add() {
      try {
        // Submit the form.
        const { data } = await this.form.post("/api/product");

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
      this.$router.push({ name: "products.index" });
    },
  },
};
</script>

<style>
.product-card .card-body {
  padding: 16px;
}
</style>
