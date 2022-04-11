<template>
  <div class="row justify-content-center">
    <div class="col-md-12 mb-3">
      <card :title="$t('product')" class="product-card">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <select
                class="form-control form-select float-left"
                style="width: 5.5em"
                aria-label="Limit Per Page"
                v-on:change="onChangeLimit($event)"
              >
                <option>Per Page</option>
                <option selected value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
          </div>
          <div class="col-md-6 text-right">
            <router-link
              :to="{ name: 'products.add' }"
              class="btn btn-primary float-end"
            >
              <fa icon="plus" fixed-width />
              {{ $t("add") }}
            </router-link>
          </div>
          <div class="col-md-12">
            <table class="table table-hover table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th width="20%">{{ $t("name") }}</th>
                  <th width="40%">{{ $t("description") }}</th>
                  <th>{{ $t("price") }}</th>
                  <th>{{ $t("stock") }}</th>
                  <th width="175px">{{ $t("actions") }}</th>
                </tr>
              </thead>
              <tbody v-if="products.length != 0 && isLoading == false">
                <tr v-for="(product, index) in products.data" :key="product.id">
                  <td>{{ index + 1 + (page - 1) * limit }}</td>
                  <td>{{ product.name }}</td>
                  <td>{{ product.description }}</td>
                  <td>{{ product.price }}</td>
                  <td>{{ product.stock }}</td>
                  <td>
                    <router-link
                      :to="{
                        name: 'products.edit',
                        params: { id: product.id },
                      }"
                      class="btn btn-sm btn-success"
                    >
                      <fa icon="pencil-alt" fixed-width />
                      {{ $t("edit") }}
                    </router-link>
                    <button
                      class="btn btn-sm btn-danger"
                      @click="deleteProduct(product.id)"
                    >
                      <fa icon="trash" fixed-width />
                      {{ $t("delete") }}
                    </button>
                  </td>
                </tr>
              </tbody>
              <tbody v-else-if="isLoading">
                <tr>
                  <td colspan="6" class="text-center">
                    <div class="spinner-border" role="status">
                      <span class="sr-only">{{ $t("loading") }}</span>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td colspan="6" class="text-center">
                    {{ $t("product_not_found") }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-12">
            <pagination
              :data="products"
              :limit="limit"
              @pagination-change-page="getProducts"
            >
              <span slot="prev-nav">&lt; {{ $t("previous") }}</span>
              <span slot="next-nav">{{ $t("next") }} &gt;</span>
            </pagination>
          </div>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default {
  middleware: "auth",
  metaInfo() {
    return { title: this.$t("product") };
  },
  data() {
    return {
      products: {},
      page: 1,
      limit: 5,
      isLoading: false,
    };
  },

  mounted() {
    this.getProducts();
  },

  methods: {
    getProducts(page = 1) {
      this.page = page;
      this.isLoading = true;
      axios
        .get(`api/product?page=${page}&per_page=${this.limit}`)
        .then((response) => {
          this.products = response.data;
        })
        .then(() => {
          this.isLoading = false;
        });
    },

    deleteProduct(id) {
      Swal.fire({
        icon: "warning",
        title: this.$t("confirm_alert_title"),
        text: this.$t("product_delete_confirm"),
        showCancelButton: true,
        confirmButtonText: this.$t("ok"),
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`api/product/${id}`).then((response) => {
            Swal.fire(this.$t("deleted"), response.data.message, "success");
            this.getProducts(1);
          });
        }
      });
    },

    onChangeLimit(event) {
      // https://flaviocopes.com/how-to-convert-string-to-number-javascript/
      this.limit = event.target.value * 1;
      this.getProducts(1);
    },
  },
};
</script>

<style>
.product-card .card-body {
  padding: 0 16px 0;
}
</style>
