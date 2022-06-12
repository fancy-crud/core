<template>
  <nav aria-label="Page navigation example">
    <ul class="inline-flex items-center -space-x-px">
      <li>
        <button
          @click="onSelectPage(pagination.page - 1)"
          class="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span class="sr-only">Previous</span>
          <svg
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          ><path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          /></svg>
        </button>
      </li>
      <template v-if="includeFirstPage">
        <li>
          <button
            @click="onSelectPage(1)"
            class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            1
          </button>
        </li>
        <li>
          <button class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
            ...
          </button>
        </li>
      </template>
      <li
        v-for="p in pager.pages"
        @click="onSelectPage(p)"
        :key="p"
      >
        <button
          class="py-2 px-3 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          :class="currentPageClass(p, currentPage)"
        >
          {{ p }}
        </button>
      </li>
      <template v-if="includeLastPage">
        <li>
          <button class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
            ...
          </button>
        </li>
        <li>
          <button
            @click="onSelectPage(pager.totalPages)"
            class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            {{ pager.totalPages }}
          </button>
        </li>
      </template>
      <li>
        <button
          @click="onSelectPage(pagination.page + 1)"
          class="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span class="sr-only">Next</span>
          <svg
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          ><path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          /></svg>
        </button>
      </li>
    </ul>
  </nav>
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
  (e: 'update:modelValue', currentPage: number): void
  (e: 'change', currentPage: number): void
}>()

const currentPage = ref(props.modelValue)
const pager = computed(() => paginate(
  props.pagination.count,
  props.pagination.page,
  props.pagination.rowsPerPage,
  3,
))

const onSelectPage = (page: number) => {
  if (page < 1 || page > pager.value.totalPages)
    return

  currentPage.value = page
  emit('update:modelValue', currentPage.value)
  emit('change', currentPage.value)
}

const includeFirstPage = computed(() => !pager.value.pages.includes(1))
const includeLastPage = computed(() => !pager.value.pages.includes(pager.value.totalPages))
const currentPageClass = computed(() => (page: number, currentPage: number) => {
  return page === currentPage ? 'text-blue-600 bg-blue-50' : 'text-gray-500 bg-white'
})

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
