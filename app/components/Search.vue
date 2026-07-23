<script setup>
import { ref, watch } from "vue"
import { onClickOutside } from "@vueuse/core"

const router = useRouter()

const search = ref("")
const searchLoading = ref(false)
const searchResults = ref([])
const showSuggestions = ref(false)

const searchWrapper = ref(null)

let debounce = null

watch(search, (value) => {
  clearTimeout(debounce)

  const keyword = value.trim()

  if (keyword.length < 2) {
    searchResults.value = []
    showSuggestions.value = false
    return
  }

  debounce = setTimeout(() => {
    searchProperty()
  }, 400)
})

const searchProperty = async () => {
  const keyword = search.value.trim()
    console.log('searching......');
    
  if (!keyword) return
   console.log(keyword,'key');

 console.log('searching......1');
  searchLoading.value = true

  try {
    const res = await useApiFetch(
      `/property/search?q=${encodeURIComponent(keyword)}&limit=6`,
      {
        method: "GET",
      }
    )

    console.log(res)

    if (res?.success) {
      searchResults.value =
        res?.data?.data ||
        res?.data ||
        []
    } else {
      searchResults.value = []
    }

    showSuggestions.value = true
  } catch (err) {
    console.error(err)
    searchResults.value = []
    showSuggestions.value = true
  } finally {
    searchLoading.value = false
  }
}

const handleFocus = () => {
  if (search.value.trim().length >= 2) {
    showSuggestions.value = true

    if (!searchResults.value.length) {
      searchProperty()
    }
  }
}

const closeSuggestions = () => {
  showSuggestions.value = false
}

const goToSearchPage = () => {
  closeSuggestions()

  router.push({
    path: "/search",
    query: {
      q: search.value.trim(),
    },
  })
}

onClickOutside(searchWrapper, () => {
  closeSuggestions()
})
</script>

<template>
  <div
    ref="searchWrapper"
    class="relative w-full max-w-5xl mt-5 h-full  "
  >
  <div class=" flex ">
            <input
            v-model="search"
            @focus="handleFocus"
            @keydown.enter="goToSearchPage"
            type="text"
            placeholder="Search property, city, state, agent..."
            class="w-full rounded-md px-4 py-2  sm:py-4  -sm border border-gray-200 outline-none focus:ring-2 focus:ring-primary"
            />
            <div class=" h-full   bg-gray-950   w-14   absolute  right-0 ">
             <Icon name="lucide:search" class="    h-full font-semibold  text-white  text-2xl" />
            </div>
           
    </div>
    <div
      v-if="showSuggestions"
      class="absolute left-0 right-0 top-full mt-2 bg-white rounded-sm shadow-2xl border border-gray-100 overflow-visible z-50"
    >
      <!-- Loading -->
      <div
        v-if="searchLoading"
        class="p-5 text-center text-gray-500"
      >
        Searching...
      </div>

      <!-- Results -->
      <template v-else-if="searchResults.length">

        <NuxtLink
          v-for="item in searchResults"
          :key="item._id"
          :to="`/property/${item.slug || item._id}`"
          class="flex sm:gap-4 gap-1 sm:p-4 p-1 hover:bg-gray-50 transition border-b border-gray-100 last:border-none"
          @click="closeSuggestions"
        >
          <img {{item.media}}
            :src="item?.media?.files[0]?.url || '/images/property-placeholder.jpg'"
            :alt="item.title"
            class="sm:w-16 sm:h-16 w-12 h-12 rounded-sm object-cover flex-shrink-0"
          >

          <div class="flex-1 min-w-0">

            <h3 class="font-semibold  text-left text-sm text-gray-900 line-clamp-1">
              {{ item.title }}
            </h3>

            <p
              class="text-sm text-gray-500 mt-1 line-clamp-2"
            >
               <div
                v-if="item.description"
                class="prose max-w-none text-xs text-left"
                v-html="item.description"
            />
            </p>

            <div
              class="flex items-center gap-2 mt-2 text-xs text-gray-400"
            >
              <span>
                {{ item.location?.city }}
              </span>

              <span
                v-if="item.location?.state"
              >
                ,
                {{ item.location.state }}
              </span>

              <span>•</span>

              <span>
                {{ item.purpose }}
              </span>
            </div>

            <div
              v-if="item.user?.profile?.name"
              class="text-xs text-primary mt-1"
            >
              {{ item.user.profile.name }}
            </div>

          </div>
        </NuxtLink>

        <button
          @click="goToSearchPage"
          class="w-full py-3 font-semibold text-primary hover:bg-gray-50"
        >
          View all results for "{{ search }}"
        </button>

      </template>

      <!-- Empty -->
      <div
        v-else
        class="p-5 text-center text-gray-500"
      >
        No property found for
        <strong>"{{ search }}"</strong>
      </div>

    </div>
  </div>
</template>