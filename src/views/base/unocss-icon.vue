<!--------------------------------
 - @Author: Ronnie Zhang
 - @LastEditor: Ronnie Zhang
 - @LastEditTime: 2023/12/05 21:27:49
 - @Email: zclzone@outlook.com
 - Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 --------------------------------->

<template>
  <CommonPage show-footer>
    <template #title-suffix>
      <n-tag class="ml-12" type="primary">
        feather图标集 + isme自定义图标
      </n-tag>
    </template>
    <ul class="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] justify-items-center gap-16">
      <li
        v-for="item in icons"
        :key="item"
        class="w-160 f-c-c flex-col cursor-pointer rounded-12 px-12 py-24 card-border auto-bg"
        @click="copy(`&lt;i class=&quot;${item}&quot; /&gt;`)"
      >
        <i :class="`${item}?mask`" class="text-28 text-gray-600 hover:bg-primary" />
        <span
          class="mt-16 text-center text-14 text-gray-400 hover:color-primary"
          @click.stop="copy(item)"
        >
          {{ item }}
        </span>
      </li>
    </ul>
  </CommonPage>
</template>

<script setup>
import { useClipboard } from '@vueuse/core'
import icons from 'isme:icons'

const { copy, copied } = useClipboard()

watch(copied, (val) => {
  if (val)
    $message.success('已复制到剪切板')
})
</script>
