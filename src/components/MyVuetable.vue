<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-11 21:49:00
 * @LastEditTime: 2019-09-17 21:14:02
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div id="table" class="table">
    <div class="handle_header">
      <Input search enter-button placeholder="Enter something..." class="search" v-model="searchVal" @on-search="handleSearch"/>
      <button type="button" class="add_btn" @click="goUser">新增用户数据</button>
    </div>
    <vuetable ref="vuetable"
              :api-url="tableData"
              :fields="defaultFiled"
              :query-params="customParams"
              :sort-params="getSortParam"
              :sort-order="sortOrder"
              :transform="transformData"
              :append-params="moreParams"
              data-path="mydata"
              pagination-path="pagination"
              :per-page="perPage"
              :css="css.table"
              @vuetable:pagination-data="onPaginationData">
              <div slot="admin-slot" slot-scope="props">
                <i-switch :value="props.rowData.isAdmin" :disabled="disabled">
                    <span slot="open" v-if="props.rowData.isAdmin">开</span>
                    <span slot="close" v-else>关</span>
                </i-switch>
              </div>
    </vuetable>
    <vuetable-pagination ref="pagination" @vuetable-pagination:change-page="onChangePage"></vuetable-pagination>
  </div>
</template>

<script>
import Vuetable from 'vuetable-2';
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination';
import DefaultFiled from './defaultFiled';
import CssTable from './cssTable';
export default {
  data() {
    return {
      tableData: "http://localhost:9008/api/user",
      customParams: {
        sort: "sort",
        page: "pageIndex",
        perPage: "pageSize"
      },
      defaultFiled: DefaultFiled,
      disabled: true,
      css: CssTable,
      sortOrder: [
        {
          field: 'age',
          direction: 'asc'
        }
      ],
      perPage: 2,
      searchVal: '',
      moreParams: {}
    }
  },
  components: {
    Vuetable,
    VuetablePagination
  },
  methods: {
    goUser() {
      this.$router.push({ path: '/user' });
    },
    getSortParam(sortOrder) {
      let that = this;
      return sortOrder.map(function(sort) {
          that.currentSort = sort.field + '|' + sort.direction;
          return sort.field + '|' + sort.direction;
      }).join(',');
    },
    onPaginationData (paginationData) {
      let mergeData = Object.assign({}, this.initData.data, this.initData.pagination);
      this.$refs.pagination.setPaginationData(mergeData);
    },
    onChangePage (page) {
      this.$refs.vuetable.changePage(page);
    },
    transformData(data) {
      this.currentPage = data.curIndex;
      var transformed = {};

      transformed.pagination = {
        total: data.total,
        per_page: data.pageSize,
        current_page: data.curIndex,
        last_page: data.lastPage,
        from: data.from,
        to : data.to,
        next_page_url: data.hasNextPage ? (this.currentPage++, `${this.tableData}?sort=${this.currentSort}&pageIndex=${this.currentPage}&pageSize=${data.pageSize}`) : null,
        prev_page_url: data.hasPrevPage ? (this.currentPage--, `${this.tableData}?sort=${this.currentSort}&pageIndex=${this.currentPage}&pageSize=${data.pageSize}`) : null,
      }

      transformed.mydata = data.data;
      this.initData = transformed;
      return transformed;
    },
    handleSearch() {
      this.moreParams['filter'] = this.searchVal;
      this.$nextTick(function() {
        this.$refs.vuetable.refresh();
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table{
  width: 1400px;
  margin: 0 auto;
}
.handle_header{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.add_btn{
  width: 120px;
  height: 40px;
  line-height: 40px;
  background: #409EFF;
  color: #fff;
  font-size: 16px;
}
.search{
  width: 400px;
}
</style>
