<template>
  <div class="space-y-5">
 
         <div  v-show="!reviews" class="flex flex-col items-center text-gray-500">
            <div class="text-4xl mb-3">💬</div>
            <p class="font-medium">No reviews yet</p>
            <p class="text-sm">Be the first to review this agent.</p>

            <NuxtLink to="/auth?type=register-page" class="mt-4 bg-green-600 text-white px-4 py-2 rounded">
              Write a Review
            </NuxtLink>
          </div>

    <!-- Reviews -->
    <div v-show="reviews"  class=" ">
      <div
        v-for="review in reviews"
        :key="review.id"
        class="border rounded-2xl p-6 bg-white"
      >

        <div class="flex justify-between">

          <div class="flex gap-4">
        
            <img
              :src="review?.buyer?.avatar || '/image/icon/avatar.svg' "
              class="w-14 h-14 rounded-full object-cover"
            >

            <div>

              <div class="flex items-center gap-2">

                <h3 class="font-semibold">
                  {{ review.buyer.firstName }}   {{ review.buyer.lastName ||  review.buyer.middleName }}
                </h3>

                <span
                  class="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs"
                >
                  Verified Buyer
                </span>

              </div>

              <p class="text-sm text-slate-500">
                Purchased
                <b >{{ review.property.title.slice(0, 30) }}</b>
              </p>

              <div class="flex items-center gap-1 mt-2">
                
                <Icon
                  v-for="i in 5"
                  :key="i"
                  name="heroicons:star-solid"
                  class="w-4 h-4"
                  :class="
                    i <= review.rating
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  "
                />

                <span class="text-sm text-slate-500 ml-2">
                
                  {{ timeAgo(review.createdAt) }} 
                </span>

              </div>

            </div>

          </div>

          <div class="text-right">

            <p class="font-bold text-green-600">
              ₦{{ review.order.totalAmount/100 }}
            </p>

            <p class="text-xs text-slate-500">
              Purchase Amount
            </p>

          </div>

        </div>

        <p class="mt-5 leading-7 text-slate-700">
          {{ review.comment }}
        </p>

        <!-- Tags -->

        <div class="flex flex-wrap gap-2 mt-5">
                <div
            v-for="(value, key) in review.liked"
            :key="key"
          >
            <span
              v-if="value"
              class="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
            >
              {{ labels[key] }}
            </span>
          </div>
        

        </div>

        <!-- Footer -->

        <div
          class="border-t mt-6 pt-4 flex justify-between text-sm text-slate-500"
        >

          <div class="flex items-center gap-5">

            <span class="flex items-center gap-2">
              <Icon
                name="heroicons:home"
                class="w-4 h-4"
              />
              {{ review.property.type }}
            </span>

            <span class="flex items-center gap-2">
              <Icon
                name="heroicons:map-pin"
                class="w-4 h-4"
              />
              {{ review.property.location.state }}
            </span>

          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<!-- <script setup>
const reviews = [
  {
    id: 1,
    name: "Aisha Bello",
    avatar: "https://i.pravatar.cc/150?img=5",
    property: "2 Plots of Land",
    propertyType: "Land",
    amount: "8,500,000",
    rating: 5,
    date: "2 weeks ago",
    location: "Osun State",
    comment:
      "The seller was very professional from the inspection stage until ownership transfer. Documentation was complete and communication was excellent. I highly recommend this seller.",
    tags: [
      "Fast Response",
      "Verified Documents",
      "Friendly",
      "Professional"
    ]
  },

  {
    id: 2,
    name: "John Michael",
    avatar: "https://i.pravatar.cc/150?img=12",
    property: "3 Bedroom Duplex",
    propertyType: "House",
    amount: "65,000,000",
    rating: 4,
    date: "1 month ago",
    location: "Lagos",
    comment:
      "Inspection was smooth and the house matched the listing. The seller answered all my questions promptly.",
    tags: [
      "Accurate Listing",
      "Good Communication"
    ]
  },

  {
    id: 3,
    name: "Grace Samuel",
    avatar: "https://i.pravatar.cc/150?img=20",
    property: "Residential Land",
    propertyType: "Land",
    amount: "5,200,000",
    rating: 5,
    date: "3 months ago",
    location: "Abuja",
    comment:
      "One of the easiest property purchases I've made. Everything was transparent and secure through escrow.",
    tags: [
      "Secure Escrow",
      "Professional",
      "Recommended"
    ]
  }
]
</script> -->


<script setup>
import { computed, watch } from "vue"
const props = defineProps({
    userId:String
})


const route = useRoute()
const emit = defineEmits(["stats"])
const {
  data,
  pending,
  refresh,
  error
} = await useAsyncData(

  () => `seller-reviews-${route.params.id || props.userId}`,

  async () => {
    const res = await useApiFetch(
      `/review/seller/${route.params.id || props.userId}`
    )

    if (!res.success) {
      throw createError({
        statusCode: 404,
        statusMessage: res.message
      })
    }

    return res.data
  }
)

const reviews = computed(() => data.value?.reviews ||  [])

const stats = computed(() => data.value?.stats || {
  averageRating: 0,
  totalReviews: 0,
  propertiesSold: 0
})

const timeAgo = (date) => {
  if (!date) return ""

  const now = new Date()
  const past = new Date(date)

  const seconds = Math.floor((now - past) / 1000)

  if (seconds < 60) {
    return "Just now"
  }

  const minutes = Math.floor(seconds / 60)

  if (minutes < 60) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`
  }

  const hours = Math.floor(minutes / 60)

  if (hours < 24) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`
  }

  const days = Math.floor(hours / 24)

  if (days === 1) {
    return "Yesterday"
  }

  if (days < 7) {
    return `${days} day${days > 1 ? "s" : ""} ago`
  }

  const weeks = Math.floor(days / 7)

  if (weeks < 5) {
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`
  }

  const months = Math.floor(days / 30)

  if (months < 12) {
    return `${months} month${months > 1 ? "s" : ""} ago`
  }

  const years = Math.floor(days / 365)

  return `${years} year${years > 1 ? "s" : ""} ago`
}


const labels = {
  communication: "Communication",
  propertyAccuracy: "Property Accuracy",
  fastResponse: "Fast Response",
  trustworthySeller: "Trustworthy Seller"
}

const reviewTags = computed(() => {
  console.log(reviews.value);
  
  const liked = reviews.value?.liked || {}
  console.log(liked);
  
  return likedOptions
    .filter(option => liked[option.key])
    .map(option => option.label)
})

watch(
  stats,
  (newStats) => {
    emit("stats", newStats)
  },
  {
    immediate: true
  }
)
</script>