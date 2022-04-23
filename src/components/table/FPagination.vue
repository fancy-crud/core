<template>
  <div class="btn-group items-center">
    <button
      @click="onSelectPage(pagination.page - 1)"
      class="btn btn-ghost"
    >
      <i class="mdi mdi-chevron-left text-lg" />
    </button>

    <template v-if="includeFirstPage">
      <button
        @click="onSelectPage(1)"
        class="btn btn-ghost"
      >
        1
      </button>

      <button class="btn btn-ghost btn-disabled">
        ...
      </button>
    </template>

    <button
      v-for="p in pager.pages"
      :key="p"
      @click="onSelectPage(p)"
      :class="pagination.page === p ? 'btn btn-active' : 'btn btn-ghost'"
    >
      {{ p }}
    </button>

    <template v-if="includeLastPage">
      <button class="btn btn-ghost btn-disabled">
        ...
      </button>

      <button
        @click="onSelectPage(pager.totalPages)"
        class="btn btn-ghost"
      >
        {{ pager.totalPages }}
      </button>
    </template>

    <button
      @click="onSelectPage(pagination.page + 1)"
      class="btn btn-ghost"
    >
      <i class="mdi mdi-chevron-right text-lg" />
    </button>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  modelValue: number
  pagination: {
    page: number
    rowsPerPage: number
    count: number
  }
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', currentPage: number)
  (e: 'change', currentPage: number)
}>()

const currentPage = ref(props.modelValue)
const pager = computed(() => paginate(
  props.pagination.count,
  props.pagination.page,
  props.pagination.rowsPerPage,
  3,
))

const onSelectPage = (page: number) => {
  if (page < 1 || page > pager.value.totalPages) return

  currentPage.value = page
  emit('update:modelValue', currentPage.value)
  emit('change', currentPage.value)
}

const includeFirstPage = computed(() => !pager.value.pages.includes(1))
const includeLastPage = computed(() => !pager.value.pages.includes(pager.value.totalPages))

watch(() => props.modelValue, () => currentPage.value = props.modelValue)

function paginate(totalItems: number, currentPage = 1, pageSize = 10, maxPages = 10) {
  // calculate total pages
  const totalPages = Math.ceil(totalItems / pageSize)

  // ensure current page isn't out of range
  if (currentPage < 1)
    currentPage = 1

  else if (currentPage > totalPages)
    currentPage = totalPages

  let startPage: number, endPage: number
  if (totalPages <= maxPages) {
    // total pages less than max so show all pages
    startPage = 1
    endPage = totalPages
  }
  else {
    // total pages more than max so calculate start and end pages
    const maxPagesBeforeCurrentPage = Math.floor(maxPages / 2)
    const maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1
    if (currentPage <= maxPagesBeforeCurrentPage) {
      // current page near the start
      startPage = 1
      endPage = maxPages
    }
    else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
      // current page near the end
      startPage = totalPages - maxPages + 1
      endPage = totalPages
    }
    else {
      // current page somewhere in the middle
      startPage = currentPage - maxPagesBeforeCurrentPage
      endPage = currentPage + maxPagesAfterCurrentPage
    }
  }

  // calculate start and end item indexes
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1)

  // create an array of pages to iterate in the pager control
  const pages = Array.from(Array(endPage + 1 - startPage).keys()).map(i => startPage + i)

  // return object with all pager properties required by the view
  return {
    totalItems,
    currentPage,
    pageSize,
    totalPages,
    startPage,
    endPage,
    startIndex,
    endIndex,
    pages,
  }
}
</script>
