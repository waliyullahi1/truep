<template>
  <div class="space-y-6 text-black">
    <AdminBanksdetails
  v-if="showVerifyModal"
  :user-id="selectedUserId"
  @close="closeVerification"
  @updated="closeVerification"
/>
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">
          Bank Account Verification
        </h1>

        <p class="text-sm text-slate-500 mt-1">
          Review and approve users' withdrawal bank accounts.
        </p>
      </div>

      <div class="flex gap-3">

        <div class="rounded-lg border bg-white px-4 py-3 text-center">
          <p class="text-xs text-slate-500">Pending</p>
          <p class="text-xl font-bold text-amber-600">
            {{ pendingCount }}
          </p>
        </div>

        <div class="rounded-lg border bg-white px-4 py-3 text-center">
          <p class="text-xs text-slate-500">Verified</p>
          <p class="text-xl font-bold text-green-600">
            {{ verifiedCount }}
          </p>
        </div>

      </div>
    </div>

    <!-- Search -->

    <div class="rounded-xl border bg-white p-4">

      <input
        v-model="search"
        placeholder="Search user..."
        class="w-full rounded-lg border px-4 py-3 outline-none focus:border-green-500"
      >

    </div>

    <!-- Table -->

    <div class="overflow-hidden rounded-xl border bg-white">

      <table class="w-full">

        <thead class="bg-slate-50">

          <tr class="text-left">

            <th class="px-6 py-4">User</th>

            <th class="px-6 py-4">Bank</th>

            <th class="px-6 py-4">Account</th>

            <th class="px-6 py-4">Status</th>

            <th class="px-6 py-4 text-right">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          <tr
            v-for="item in filteredAccounts"
            :key="item._id"
            class="border-t hover:bg-slate-50"
          >

            <td class="px-6 py-4">

              <div class="font-semibold">

                {{ item.user.firstName }}
                {{ item.user.lastName }}

              </div>

              <div class="text-sm text-slate-500">

                {{ item.user.email }}

              </div>

            </td>

            <td class="px-6 py-4">

              {{ item.bankName }}

            </td>

            <td class="px-6 py-4">

              <div>{{ item.accountName }}</div>

              <div class="text-sm text-slate-500">

                {{ item.accountNumber }}

              </div>

            </td>

            <td class="px-6 py-4">

              <span
                class="rounded-full px-3 py-1 text-xs font-semibold"
                :class="{
                  'bg-amber-100 text-amber-700': item.status==='PENDING',
                  'bg-green-100 text-green-700': item.status==='VERIFIED',
                  'bg-red-100 text-red-700': item.status==='REJECTED'
                }"
              >

                {{ item.status }}

              </span>

            </td>

            <td class="px-6 py-4 text-right">

              <button
                @click="openVerification(item.user._id)"
                class="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
              >
                Review
              </button>

            </td>

          </tr>

          <tr v-if="filteredAccounts.length===0">

            <td
              colspan="5"
              class="py-16 text-center text-slate-500"
            >

              No bank accounts awaiting verification.

            </td>

          </tr>

        </tbody>

      </table>

    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
definePageMeta({
  layout: 'admin',
  adminOnly: true
})
const search = ref("")

const accounts = ref([])

const pendingCount = computed(() =>
  accounts.value.filter(x => x.status === "PENDING").length
)

const verifiedCount = computed(() =>
  accounts.value.filter(x => x.status === "VERIFIED").length
)


const filteredAccounts = computed(() => {

  if (!search.value) return accounts.value

  return accounts.value.filter(item => {

    const keyword = search.value.toLowerCase()

    return (
      item.user.firstName.toLowerCase().includes(keyword) ||
      item.user.lastName.toLowerCase().includes(keyword) ||
      item.user.email.toLowerCase().includes(keyword) ||
      item.bankName.toLowerCase().includes(keyword)
    )

  })

})

const loadAccounts = async () => {
  const res = await useApiFetch("/payout/get-accounts")
    console.log(res.data);
    
  accounts.value = res.data.data

}

// const openVerification = (userId) => {

//   navigateTo(`/admin/bank-verification/${userId}`)

// }


const showVerifyModal = ref(false)

const selectedUserId = ref(null)

const openVerification = (userId) => {
  selectedUserId.value = userId
  showVerifyModal.value = true
}

const closeVerification = () => {
  showVerifyModal.value = false
  selectedUserId.value = null

  loadAccounts() // Refresh list
}

onMounted(loadAccounts)
</script>