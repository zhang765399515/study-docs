<script setup lang="ts">
import { ref } from 'vue'
import { useData } from 'vitepress'

const defaultAuthor = 'Junlin Zhang'
const { frontmatter } = useData()

const contributorsArr = [frontmatter.value?.author, ...frontmatter.value.contributors || []].filter(x => x)
const contributors = ref(contributorsArr)

function reName(name: string) {
  return name === 'Junlin Zhang' ? 'Junlin Zhang' : name
}

function getAvatarUrl(name: string) {
  return `https://github.com/zhang765399515.png`
}
function getGithubLink(name: string) {
  return `https://github.com/${reName(name)}`
}

function isNotEmpty(arr: string | string[]) {
  return Array.isArray(arr) && arr.length
}
</script>

<template>
  <div v-if="isNotEmpty(contributors)" class="flex flex-wrap gap-4">
    <div v-for="contributor of contributors" :key="contributor" class="flex gap-2 items-center">
      <a :href="getGithubLink(contributor)" rel="noreferrer" target="_blank">
        <img :src="getAvatarUrl(contributor)" class="w-8 h-8 rounded-full">
      </a>
      {{ contributor }}
    </div>
  </div>
  <div v-else class="flex gap-2 items-center" style="margin-top: 120px;">
    <a :href="getGithubLink(defaultAuthor)" rel="noreferrer" target="_blank">
      <img :src="getAvatarUrl(defaultAuthor)" class="w-8 h-8 rounded-full">
    </a>
    {{ 'Junlin Zhang' }}
  </div>
</template>
