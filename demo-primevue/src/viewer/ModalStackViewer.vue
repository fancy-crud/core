<template>
  <div class="pb-5">
    <div class="mb-6">
      <h1 class="text-3xl font-bold mb-2">Modal Stack System - Proof of Concept</h1>
      <p class="text-gray-600 mb-4">
        This demo showcases the new nested modal stack system with unlimited modal nesting,
        smooth carousel animations, and proper z-index management.
      </p>
      
      <!-- Stack Info -->
      <div class="bg-blue-50 border border-blue-200 rounded p-4 mb-4">
        <h3 class="font-semibold mb-2">Current Modal Stack:</h3>
        <div v-if="modalStack.length === 0" class="text-gray-500 italic">
          No modals open
        </div>
        <div v-else class="flex gap-2 flex-wrap">
          <span
            v-for="(modalId, index) in modalStack"
            :key="modalId"
            class="px-3 py-1 rounded"
            :class="index === modalStack.length - 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700'"
          >
            {{ modalId }}
            <span v-if="index === modalStack.length - 1" class="ml-1 text-xs">(active)</span>
          </span>
        </div>
        <div class="mt-2 text-sm text-gray-600">
          Stack depth: {{ modalStack.length }} modal(s)
        </div>
      </div>

      <!-- Control Buttons -->
      <div class="mb-4">
        <h3 class="font-semibold mb-2">Position Demos:</h3>
        <div class="flex gap-2 mb-3 flex-wrap">
          <Button
            label="Right Stack (Default)"
            icon="pi pi-arrow-right"
            @click="showRightModal1 = true"
            severity="primary"
          />
          <Button
            label="Left Stack"
            icon="pi pi-arrow-left"
            @click="showLeftModal1 = true"
            severity="success"
          />
          <Button
            label="Center Stack"
            icon="pi pi-minus"
            @click="showCenterModal1 = true"
            severity="info"
          />
        </div>
        
        <h3 class="font-semibold mb-2">Other Demos:</h3>
        <div class="flex gap-2 mb-2 flex-wrap">
          <Button
            label="Open Simple Modal"
            icon="pi pi-window-maximize"
            @click="showSimpleModal = true"
            severity="secondary"
          />
          <Button
            label="Open Form Modal"
            icon="pi pi-file-edit"
            @click="showFormModal = true"
            severity="secondary"
          />
          <Button
            label="Open Artist Table"
            icon="pi pi-table"
            @click="showTableModal = true"
            severity="secondary"
          />
          <Button
            v-if="hasModalsOpen"
            label="Close All"
            icon="pi pi-times"
            @click="closeAllModals"
            severity="danger"
          />
        </div>
      </div>
    </div>

    <!-- Demo Table - shows FTable with modal stack integration -->
    <div class="mb-6">
      <h2 class="text-2xl font-semibold mb-3">FTable with Nested Modal Support</h2>
      <f-table v-bind="artistsTable">
        <template #after-field-name>
          <div class="col-span-12">
            <Button
              label="Right Stack (Default)"
              icon="pi pi-arrow-right"
              @click="showRightModal1 = true"
              severity="primary"
            />
          </div>
        </template>
      </f-table>
    </div>

    <!-- Simple Modal - Level 1 -->
    <f-modal v-model="showSimpleModal" modal-id="simple-modal-1">
      <div class="p-6">
        <h2 class="text-2xl font-bold mb-4">Simple Modal (Level 1)</h2>
        <p class="mb-4">
          This is a simple modal. It uses the <code class="bg-gray-100 px-2 py-1 rounded">modal-id="simple-modal-1"</code> prop
          to enable modal stacking.
        </p>
        <p class="mb-4">
          Try opening another modal from here to see the stacking effect!
        </p>

        <div class="flex gap-2 mb-4">
          <Button
            label="Open Nested Modal"
            icon="pi pi-plus"
            @click="showNestedModal1 = true"
            severity="warning"
          />
          <Button
            label="Open Form"
            icon="pi pi-file-edit"
            @click="showNestedForm = true"
            severity="help"
          />
        </div>

        <div class="border-t pt-4">
          <p class="text-sm text-gray-600 mb-2">
            <strong>Position:</strong> {{ getPositionLabel('simple-modal-1') }}
          </p>
          <p class="text-sm text-gray-600 mb-2">
            <strong>Z-Index:</strong> {{ getModalZIndex('simple-modal-1') }}
          </p>
        </div>

        <Button
          label="Close"
          icon="pi pi-times"
          @click="showSimpleModal = false"
          severity="secondary"
          class="mt-4"
        />
      </div>
    </f-modal>

    <!-- Nested Modal Level 2 -->
    <f-modal v-model="showNestedModal1" modal-id="nested-modal-2">
      <div class="p-6">
        <h2 class="text-2xl font-bold mb-4 text-orange-600">Nested Modal (Level 2)</h2>
        <p class="mb-4">
          Notice how the previous modal shifted to the right? That's the carousel effect!
        </p>
        <p class="mb-4">
          This modal slides in from the <strong>left</strong> side, while background modals
          shift to create a visual hierarchy.
        </p>

        <div class="bg-orange-50 border border-orange-200 rounded p-4 mb-4">
          <p class="text-sm mb-2"><strong>Animation Details:</strong></p>
          <ul class="text-sm space-y-1 list-disc list-inside">
            <li>Previous modal: shifted right, dimmed, non-interactive</li>
            <li>Current modal: slides from -200% to -25% (left side)</li>
            <li>Z-index automatically managed</li>
          </ul>
        </div>

        <Button
          label="Open Level 3 Modal"
          icon="pi pi-plus"
          @click="showNestedModal2 = true"
          severity="danger"
          class="mb-4"
        />

        <div class="border-t pt-4">
          <p class="text-sm text-gray-600 mb-2">
            <strong>Position:</strong> {{ getPositionLabel('nested-modal-2') }}
          </p>
          <p class="text-sm text-gray-600">
            <strong>Z-Index:</strong> {{ getModalZIndex('nested-modal-2') }}
          </p>
        </div>

        <Button
          label="Go Back"
          icon="pi pi-arrow-left"
          @click="showNestedModal1 = false"
          severity="secondary"
          class="mt-4"
        />
      </div>
    </f-modal>

    <!-- Nested Modal Level 3 -->
    <f-modal v-model="showNestedModal2" modal-id="nested-modal-3">
      <div class="p-6">
        <h2 class="text-2xl font-bold mb-4 text-red-600">Deep Nested Modal (Level 3)</h2>
        <p class="mb-4">
          Now we have <strong>3 modals stacked</strong>! The system supports unlimited nesting.
        </p>
        <p class="mb-4">
          Look to the right - you can see the previous two modals stacked in the background,
          each progressively more dimmed and shifted.
        </p>

        <div class="bg-red-50 border border-red-200 rounded p-4 mb-4">
          <p class="text-sm mb-2"><strong>Stack State:</strong></p>
          <ul class="text-sm space-y-1 list-disc list-inside">
            <li>Modal 1: shifted-2 (70% right, 0.7 opacity)</li>
            <li>Modal 2: shifted-1 (70% right, 0.7 opacity)</li>
            <li>Modal 3 (this): active-left (25% left)</li>
          </ul>
        </div>

        <Button
          label="Open Level 4 (Yes, it works!)"
          icon="pi pi-plus"
          @click="showNestedModal3 = true"
          severity="contrast"
          class="mb-4"
        />

        <div class="border-t pt-4">
          <p class="text-sm text-gray-600 mb-2">
            <strong>Position:</strong> {{ getPositionLabel('nested-modal-3') }}
          </p>
          <p class="text-sm text-gray-600">
            <strong>Z-Index:</strong> {{ getModalZIndex('nested-modal-3') }}
          </p>
        </div>

        <Button
          label="Go Back"
          icon="pi pi-arrow-left"
          @click="showNestedModal2 = false"
          severity="secondary"
          class="mt-4"
        />
      </div>
    </f-modal>

    <!-- Nested Modal Level 4 (Deep nesting proof) -->
    <f-modal v-model="showNestedModal3" modal-id="nested-modal-4">
      <div class="p-6">
        <h2 class="text-2xl font-bold mb-4 text-purple-600">Level 4 - Unlimited Nesting! 🎉</h2>
        <p class="mb-4">
          This proves the system supports <strong>unlimited modal nesting</strong>.
          You can keep going deeper!
        </p>

        <div class="bg-purple-50 border border-purple-200 rounded p-4 mb-4">
          <p class="font-semibold mb-2">🎯 Key Features Demonstrated:</p>
          <ul class="text-sm space-y-1 list-disc list-inside">
            <li>✅ Unlimited modal nesting (no hardcoded limits)</li>
            <li>✅ Smooth carousel animations</li>
            <li>✅ Auto z-index management</li>
            <li>✅ Visual hierarchy with dimming</li>
            <li>✅ Proper keyboard navigation</li>
            <li>✅ Zero breaking changes (modal-id is optional)</li>
          </ul>
        </div>

        <div class="border-t pt-4 mb-4">
          <p class="text-sm text-gray-600 mb-2">
            <strong>Position:</strong> {{ getPositionLabel('nested-modal-4') }}
          </p>
          <p class="text-sm text-gray-600">
            <strong>Z-Index:</strong> {{ getModalZIndex('nested-modal-4') }}
          </p>
        </div>

        <Button
          label="Close This Modal"
          icon="pi pi-arrow-left"
          @click="showNestedModal3 = false"
          severity="secondary"
        />
      </div>
    </f-modal>

    <!-- Form Modal with Nested Form -->
    <f-modal v-model="showFormModal" modal-id="form-modal-1">
      <div class="p-6">
        <h2 class="text-2xl font-bold mb-4">Form Modal</h2>
        <f-form v-bind="demoForm">
          <template #actions>
            <div class="flex gap-2 mt-4">
              <Button
                label="Open Nested Form"
                icon="pi pi-file-edit"
                @click="showNestedForm = true"
                severity="success"
              />
              <Button
                label="Close"
                icon="pi pi-times"
                @click="showFormModal = false"
                severity="secondary"
              />
            </div>
          </template>
        </f-form>
      </div>
    </f-modal>

    <!-- Nested Form Modal -->
    <f-modal v-model="showNestedForm" modal-id="nested-form-modal">
      <div class="p-6">
        <h2 class="text-2xl font-bold mb-4 text-green-600">Nested Form</h2>
        <p class="mb-4">
          This demonstrates a common use case: editing related data while creating/editing a parent record.
        </p>
        <f-form v-bind="nestedForm">
          <template #actions>
            <div class="flex gap-2 mt-4">
              <Button
                label="Save"
                icon="pi pi-check"
                @click="showNestedForm = false"
                severity="success"
              />
              <Button
                label="Cancel"
                icon="pi pi-times"
                @click="showNestedForm = false"
                severity="secondary"
              />
            </div>
          </template>
        </f-form>
      </div>
    </f-modal>

    <!-- Table Modal -->
    <f-modal v-model="showTableModal" modal-id="table-modal-1" style="width: 90%; max-width: 1200px;">
      <div class="p-6">
        <h2 class="text-2xl font-bold mb-4">Table in Modal</h2>
        <p class="mb-4">
          Tables can be placed in modals. When you edit a row, another modal opens,
          demonstrating nested CRUD operations!
        </p>
        <f-table v-bind="nestedTable" />
        <Button
          label="Close"
          icon="pi pi-times"
          @click="showTableModal = false"
          severity="secondary"
          class="mt-4"
        />
      </div>
    </f-modal>

    <!-- RIGHT STACK POSITION DEMOS -->
    <f-modal v-model="showRightModal1" modal-id="right-modal-1">
      <div class="p-6 border-l-4 border-blue-500">
        <h2 class="text-2xl font-bold mb-4 text-blue-600">🔵 Right Stack - Level 1</h2>
        <p class="mb-4">
          This is the <strong>default behavior</strong>. Modals stack to the <strong>right</strong>.
        </p>
        <div class="bg-blue-50 border border-blue-200 rounded p-4 mb-4">
          <p class="text-sm mb-2"><strong>Right Stack Behavior:</strong></p>
          <ul class="text-sm space-y-1 list-disc list-inside">
            <li>First modal: positioned at right edge (2rem from edge)</li>
            <li>Subsequent modals: also at right edge</li>
            <li>Background modals: shift 75% RIGHT → (hide 75%, show 25%)</li>
            <li>Stack direction: Fully visible → Partially visible →</li>
          </ul>
        </div>
        
        <div class="mb-4 p-3 bg-gray-50 rounded">
          <code class="text-sm">stack-position="right"</code>
        </div>

        <Button
          label="Open Right Modal Level 2"
          icon="pi pi-arrow-right"
          @click="showRightModal2 = true"
          severity="primary"
          class="mb-2"
        />

        <div class="border-t pt-4 mt-4">
          <p class="text-sm text-gray-600">
            <strong>Position:</strong> {{ getPositionLabel('right-modal-1') }}
          </p>
        </div>

        <Button
          label="Close"
          icon="pi pi-times"
          @click="showRightModal1 = false"
          severity="secondary"
          class="mt-4"
        />
      </div>
    </f-modal>

    <f-modal v-model="showRightModal2" modal-id="right-modal-2">
      <div class="p-6 border-l-4 border-blue-600">
        <h2 class="text-2xl font-bold mb-4 text-blue-700">🔵 Right Stack - Level 2</h2>
        <p class="mb-4">
          Previous modal shifted 75% to the right (now showing only 25%). This modal is fully visible at the right edge.
        </p>
        
        <Button
          label="Open Right Modal Level 3"
          icon="pi pi-plus"
          @click="showRightModal3 = true"
          severity="primary"
          class="mb-4"
        />

        <div class="border-t pt-4">
          <p class="text-sm text-gray-600">
            <strong>Position:</strong> {{ getPositionLabel('right-modal-2') }}
          </p>
        </div>

        <Button
          label="Go Back"
          icon="pi pi-arrow-left"
          @click="showRightModal2 = false"
          severity="secondary"
          class="mt-4"
        />
      </div>
    </f-modal>

    <f-modal v-model="showRightModal3" modal-id="right-modal-3">
      <div class="p-6 border-l-4 border-blue-700">
        <h2 class="text-2xl font-bold mb-4 text-blue-800">🔵 Right Stack - Level 3</h2>
        <p class="mb-4">
          All previous modals are stacked to the right → showing only 25% of each. This one is fully visible.
        </p>

        <div class="border-t pt-4">
          <p class="text-sm text-gray-600">
            <strong>Position:</strong> {{ getPositionLabel('right-modal-3') }}
          </p>
        </div>

        <div class="flex gap-2 mt-4">
          <Button
            label="Open Level 4"
            icon="pi pi-plus"
            @click="showRightModal4 = true"
            severity="primary"
          />
          <Button
            label="Go Back"
            icon="pi pi-arrow-left"
            @click="showRightModal3 = false"
            severity="secondary"
          />
        </div>
      </div>
    </f-modal>

    <f-modal v-model="showRightModal4" modal-id="right-modal-4">
      <div class="p-6 border-l-4 border-blue-800">
        <h2 class="text-2xl font-bold mb-4 text-blue-900">🔵 Right Stack - Level 4</h2>
        <p class="mb-4">
          Now we're getting deep! All previous modals (1, 2, 3) are stacked progressively to the right.
        </p>

        <div class="border-t pt-4">
          <p class="text-sm text-gray-600">
            <strong>Position:</strong> {{ getPositionLabel('right-modal-4') }}
          </p>
        </div>

        <div class="flex gap-2 mt-4">
          <Button
            label="Open Level 5"
            icon="pi pi-plus"
            @click="showRightModal5 = true"
            severity="primary"
          />
          <Button
            label="Go Back"
            icon="pi pi-arrow-left"
            @click="showRightModal4 = false"
            severity="secondary"
          />
        </div>
      </div>
    </f-modal>

    <f-modal v-model="showRightModal5" modal-id="right-modal-5">
      <div class="p-6 border-l-4 border-blue-900">
        <h2 class="text-2xl font-bold mb-4 text-blue-950">🔵 Right Stack - Level 5</h2>
        <p class="mb-4">
          Maximum depth! All previous modals (1, 2, 3, 4) are cascading to the right with progressive offsets.
          The system supports unlimited nesting!
        </p>

        <div class="border-t pt-4">
          <p class="text-sm text-gray-600">
            <strong>Position:</strong> {{ getPositionLabel('right-modal-5') }}
          </p>
        </div>

        <Button
          label="Go Back"
          icon="pi pi-arrow-left"
          @click="showRightModal5 = false"
          severity="secondary"
          class="mt-4"
        />
      </div>
    </f-modal>

    <!-- LEFT STACK POSITION DEMOS -->
    <f-modal v-model="showLeftModal1" modal-id="left-modal-1" stack-position="left">
      <div class="p-6 border-l-4 border-green-500">
        <h2 class="text-2xl font-bold mb-4 text-green-600">🟢 Left Stack - Level 1</h2>
        <p class="mb-4">
          This modal uses <strong>left stacking</strong>. The stack direction is <strong>reversed</strong>!
        </p>
        <div class="bg-green-50 border border-green-200 rounded p-4 mb-4">
          <p class="text-sm mb-2"><strong>Left Stack Behavior:</strong></p>
          <ul class="text-sm space-y-1 list-disc list-inside">
            <li>First modal: positioned at left edge (2rem from edge)</li>
            <li>Subsequent modals: also at left edge</li>
            <li>Background modals: shift 75% LEFT ← (hide 75%, show 25%)</li>
            <li>Stack direction: Fully visible ← Partially visible ← (REVERSED!)</li>
          </ul>
        </div>
        
        <div class="mb-4 p-3 bg-gray-50 rounded">
          <code class="text-sm">stack-position="left"</code>
        </div>

        <Button
          label="Open Left Modal Level 2"
          icon="pi pi-arrow-left"
          @click="showLeftModal2 = true"
          severity="success"
          class="mb-2"
        />

        <div class="border-t pt-4 mt-4">
          <p class="text-sm text-gray-600">
            <strong>Position:</strong> {{ getPositionLabel('left-modal-1') }}
          </p>
        </div>

        <Button
          label="Close"
          icon="pi pi-times"
          @click="showLeftModal1 = false"
          severity="secondary"
          class="mt-4"
        />
      </div>
    </f-modal>

    <f-modal v-model="showLeftModal2" modal-id="left-modal-2" stack-position="left">
      <div class="p-6 border-l-4 border-green-600">
        <h2 class="text-2xl font-bold mb-4 text-green-700">🟢 Left Stack - Level 2</h2>
        <p class="mb-4">
          Previous modal shifted 75% to the LEFT (now showing only 25%). This modal is fully visible at the left edge.
        </p>
        
        <Button
          label="Open Left Modal Level 3"
          icon="pi pi-plus"
          @click="showLeftModal3 = true"
          severity="success"
          class="mb-4"
        />

        <div class="border-t pt-4">
          <p class="text-sm text-gray-600">
            <strong>Position:</strong> {{ getPositionLabel('left-modal-2') }}
          </p>
        </div>

        <Button
          label="Go Back"
          icon="pi pi-arrow-right"
          @click="showLeftModal2 = false"
          severity="secondary"
          class="mt-4"
        />
      </div>
    </f-modal>

    <f-modal v-model="showLeftModal3" modal-id="left-modal-3" stack-position="left">
      <div class="p-6 border-l-4 border-green-700">
        <h2 class="text-2xl font-bold mb-4 text-green-800">🟢 Left Stack - Level 3</h2>
        <p class="mb-4">
          All previous modals are stacked to the LEFT ← showing only 25% of each. This one is fully visible.
        </p>

        <div class="border-t pt-4">
          <p class="text-sm text-gray-600">
            <strong>Position:</strong> {{ getPositionLabel('left-modal-3') }}
          </p>
        </div>

        <div class="flex gap-2 mt-4">
          <Button
            label="Open Level 4"
            icon="pi pi-plus"
            @click="showLeftModal4 = true"
            severity="success"
          />
          <Button
            label="Go Back"
            icon="pi pi-arrow-right"
            @click="showLeftModal3 = false"
            severity="secondary"
          />
        </div>
      </div>
    </f-modal>

    <f-modal v-model="showLeftModal4" modal-id="left-modal-4" stack-position="left">
      <div class="p-6 border-l-4 border-green-800">
        <h2 class="text-2xl font-bold mb-4 text-green-900">🟢 Left Stack - Level 4</h2>
        <p class="mb-4">
          Deep left stacking! All previous modals (1, 2, 3) are cascading to the ← left with progressive offsets.
        </p>

        <div class="border-t pt-4">
          <p class="text-sm text-gray-600">
            <strong>Position:</strong> {{ getPositionLabel('left-modal-4') }}
          </p>
        </div>

        <div class="flex gap-2 mt-4">
          <Button
            label="Open Level 5"
            icon="pi pi-plus"
            @click="showLeftModal5 = true"
            severity="success"
          />
          <Button
            label="Go Back"
            icon="pi pi-arrow-right"
            @click="showLeftModal4 = false"
            severity="secondary"
          />
        </div>
      </div>
    </f-modal>

    <f-modal v-model="showLeftModal5" modal-id="left-modal-5" stack-position="left">
      <div class="p-6 border-l-4 border-green-900">
        <h2 class="text-2xl font-bold mb-4 text-green-950">🟢 Left Stack - Level 5</h2>
        <p class="mb-4">
          Maximum left depth! All previous modals (1, 2, 3, 4) are cascading to the ← left with progressive offsets.
          Stack direction is completely reversed!
        </p>

        <div class="border-t pt-4">
          <p class="text-sm text-gray-600">
            <strong>Position:</strong> {{ getPositionLabel('left-modal-5') }}
          </p>
        </div>

        <Button
          label="Go Back"
          icon="pi pi-arrow-right"
          @click="showLeftModal5 = false"
          severity="secondary"
          class="mt-4"
        />
      </div>
    </f-modal>

    <!-- CENTER STACK POSITION DEMOS -->
    <f-modal v-model="showCenterModal1" modal-id="center-modal-1" stack-position="center">
      <div class="p-6 border-l-4 border-purple-500">
        <h2 class="text-2xl font-bold mb-4 text-purple-600">🟣 Center Stack - Level 1</h2>
        <p class="mb-4">
          This modal uses <strong>center stacking</strong>. All modals stay centered!
        </p>
        <div class="bg-purple-50 border border-purple-200 rounded p-4 mb-4">
          <p class="text-sm mb-2"><strong>Center Stack Behavior:</strong></p>
          <ul class="text-sm space-y-1 list-disc list-inside">
            <li>All modals: stay centered (no edge positioning)</li>
            <li>Background modals: shift 75% right (hide 75%, show 25%)</li>
            <li>Creates a "layered" effect with centered modals</li>
            <li>Good for wizards and sequential flows</li>
          </ul>
        </div>
        
        <div class="mb-4 p-3 bg-gray-50 rounded">
          <code class="text-sm">stack-position="center"</code>
        </div>

        <Button
          label="Open Center Modal Level 2"
          icon="pi pi-plus"
          @click="showCenterModal2 = true"
          severity="help"
          class="mb-2"
        />

        <div class="border-t pt-4 mt-4">
          <p class="text-sm text-gray-600">
            <strong>Position:</strong> {{ getPositionLabel('center-modal-1') }}
          </p>
        </div>

        <Button
          label="Close"
          icon="pi pi-times"
          @click="showCenterModal1 = false"
          severity="secondary"
          class="mt-4"
        />
      </div>
    </f-modal>

    <f-modal v-model="showCenterModal2" modal-id="center-modal-2" stack-position="center">
      <div class="p-6 border-l-4 border-purple-600">
        <h2 class="text-2xl font-bold mb-4 text-purple-700">🟣 Center Stack - Level 2</h2>
        <p class="mb-4">
          This modal is centered. Previous modal shifted 75% right (showing 25%), creating a layered effect.
        </p>
        
        <Button
          label="Open Center Modal Level 3"
          icon="pi pi-plus"
          @click="showCenterModal3 = true"
          severity="help"
          class="mb-4"
        />

        <div class="border-t pt-4">
          <p class="text-sm text-gray-600">
            <strong>Position:</strong> {{ getPositionLabel('center-modal-2') }}
          </p>
        </div>

        <Button
          label="Go Back"
          icon="pi pi-arrow-left"
          @click="showCenterModal2 = false"
          severity="secondary"
          class="mt-4"
        />
      </div>
    </f-modal>

    <f-modal v-model="showCenterModal3" modal-id="center-modal-3" stack-position="center">
      <div class="p-6 border-l-4 border-purple-700">
        <h2 class="text-2xl font-bold mb-4 text-purple-800">🟣 Center Stack - Level 3</h2>
        <p class="mb-4">
          All modals stay centered. Previous ones show only 25%, creating a beautiful layered effect!
        </p>

        <div class="border-t pt-4">
          <p class="text-sm text-gray-600">
            <strong>Position:</strong> {{ getPositionLabel('center-modal-3') }}
          </p>
        </div>

        <div class="flex gap-2 mt-4">
          <Button
            label="Open Level 4"
            icon="pi pi-plus"
            @click="showCenterModal4 = true"
            severity="help"
          />
          <Button
            label="Go Back"
            icon="pi pi-arrow-left"
            @click="showCenterModal3 = false"
            severity="secondary"
          />
        </div>
      </div>
    </f-modal>

    <f-modal v-model="showCenterModal4" modal-id="center-modal-4" stack-position="center">
      <div class="p-6 border-l-4 border-purple-800">
        <h2 class="text-2xl font-bold mb-4 text-purple-900">🟣 Center Stack - Level 4</h2>
        <p class="mb-4">
          Deep center stacking! All modals remain centered with progressive layering (1, 2, 3 in background).
        </p>

        <div class="border-t pt-4">
          <p class="text-sm text-gray-600">
            <strong>Position:</strong> {{ getPositionLabel('center-modal-4') }}
          </p>
        </div>

        <div class="flex gap-2 mt-4">
          <Button
            label="Open Level 5"
            icon="pi pi-plus"
            @click="showCenterModal5 = true"
            severity="help"
          />
          <Button
            label="Go Back"
            icon="pi pi-arrow-left"
            @click="showCenterModal4 = false"
            severity="secondary"
          />
        </div>
      </div>
    </f-modal>

    <f-modal v-model="showCenterModal5" modal-id="center-modal-5" stack-position="center">
      <div class="p-6 border-l-4 border-purple-900">
        <h2 class="text-2xl font-bold mb-4 text-purple-950">🟣 Center Stack - Level 5</h2>
        <p class="mb-4">
          Maximum center depth! All previous modals (1, 2, 3, 4) are layered in the center with progressive offsets.
          Beautiful symmetry!
        </p>

        <div class="border-t pt-4">
          <p class="text-sm text-gray-600">
            <strong>Position:</strong> {{ getPositionLabel('center-modal-5') }}
          </p>
        </div>

        <Button
          label="Go Back"
          icon="pi pi-arrow-left"
          @click="showCenterModal5 = false"
          severity="secondary"
          class="mt-4"
        />
      </div>
    </f-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { RecordObject } from '@fancy-crud/vue'
import { FieldType, useForm, useTable, useModalStack } from '@fancy-crud/vue'
import Button from 'primevue/button'

// Get modal stack composable for debugging/display
const { modalStack, hasModalsOpen, closeAllModals, getModalPosition, getModalZIndex } = useModalStack()

// Modal states
const showSimpleModal = ref(false)
const showNestedModal1 = ref(false)
const showNestedModal2 = ref(false)
const showNestedModal3 = ref(false)
const showFormModal = ref(false)
const showNestedForm = ref(false)
const showTableModal = ref(false)

// Position demo modal states
const showRightModal1 = ref(false)
const showRightModal2 = ref(false)
const showRightModal3 = ref(false)
const showRightModal4 = ref(false)
const showRightModal5 = ref(false)
const showLeftModal1 = ref(false)
const showLeftModal2 = ref(false)
const showLeftModal3 = ref(false)
const showLeftModal4 = ref(false)
const showLeftModal5 = ref(false)
const showCenterModal1 = ref(false)
const showCenterModal2 = ref(false)
const showCenterModal3 = ref(false)
const showCenterModal4 = ref(false)
const showCenterModal5 = ref(false)

// Helper to get readable position label
function getPositionLabel(modalId: string) {
  const pos = getModalPosition(modalId)
  if (pos === 'active-first') return 'Active (Center - First Modal)'
  if (pos === 'active-left') return 'Active (Left Side - Active Modal)'
  if (pos === 'active-right') return 'Active (Right Side - Active Modal)'
  if (pos?.startsWith('shifted-left-')) return `Background (Shifted LEFT ${pos.split('-')[2]} level(s))`
  if (pos?.startsWith('shifted-')) return `Background (Shifted RIGHT ${pos.split('-')[1]} level(s))`
  return 'Not in stack'
}

// Demo Forms
const demoForm = useForm({
  id: 'demo-form',
  record: {} as RecordObject<any>,
  fields: {
    name: {
      type: FieldType.text,
      label: 'Name',
      placeholder: 'Enter name',
      modelValue: '',
    },
    email: {
      type: FieldType.text,
      label: 'Email',
      placeholder: 'Enter email',
      modelValue: '',
    },
    category: {
      type: FieldType.select,
      label: 'Category',
      optionLabel: 'label',
      optionValue: 'value',
      options: [
        { label: 'Category A', value: 'a' },
        { label: 'Category B', value: 'b' },
      ],
      modelValue: 'a',
    },
  },
})

const nestedForm = useForm({
  id: 'nested-form',
  record: {} as RecordObject<any>,
  fields: {
    title: {
      type: FieldType.text,
      label: 'Title',
      placeholder: 'Enter title',
      modelValue: '',
    },
    description: {
      type: FieldType.textarea,
      label: 'Description',
      placeholder: 'Enter description',
      modelValue: '',
    },
  },
})

// Artists Table (main demo)
interface Artist {
  id: number
  name: string
  genre: string
  albums: number
}

const artistsForm = useForm({
  id: 'artists-form',
  record: {} as RecordObject<Artist>,
  fields: {
    name: {
      type: FieldType.text,
      label: 'Artist Name',
      placeholder: 'Enter artist name',
      modelValue: '',
    },
    name_1: {
      type: FieldType.text,
      label: 'Artist Name',
      placeholder: 'Enter artist name',
      modelValue: '',
    },
    name_2: {
      type: FieldType.text,
      label: 'Artist Name',
      placeholder: 'Enter artist name',
      modelValue: '',
    },
    name_3: {
      type: FieldType.text,
      label: 'Artist Name',
      placeholder: 'Enter artist name',
      modelValue: '',
    },
    name_4: {
      type: FieldType.text,
      label: 'Artist Name',
      placeholder: 'Enter artist name',
      modelValue: '',
    },
    name_5: {
      type: FieldType.text,
      label: 'Artist Name',
      placeholder: 'Enter artist name',
      modelValue: '',
    },
    name_6: {
      type: FieldType.text,
      label: 'Artist Name',
      placeholder: 'Enter artist name',
      modelValue: '',
    },
    name_7: {
      type: FieldType.text,
      label: 'Artist Name',
      placeholder: 'Enter artist name',
      modelValue: '',
    },
    name_8: {
      type: FieldType.text,
      label: 'Artist Name',
      placeholder: 'Enter artist name',
      modelValue: '',
    },
    name_9: {
      type: FieldType.text,
      label: 'Artist Name',
      placeholder: 'Enter artist name',
      modelValue: '',
    },
    genre: {
      type: FieldType.select,
      label: 'Genre',
      optionLabel: 'label',
      optionValue: 'value',
      options: [
        { label: 'Rock', value: 'rock' },
        { label: 'Pop', value: 'pop' },
        { label: 'Jazz', value: 'jazz' },
        { label: 'Classical', value: 'classical' },
      ],
      modelValue: 'rock',
    },
    albums: {
      type: FieldType.text,
      label: 'Number of Albums',
      placeholder: 'Enter number',
      modelValue: 0,
    },
  },
  settings: () => ({
    title: '{{ Create Artist | Edit Artist }}',
    showCloseButton: true,
  }),
})

const artistsTable = useTable({
  form: artistsForm,
  columns: {
    name: {
      label: 'Artist Name',
    },
    genre: {
      label: 'Genre',
    },
    albums: {
      label: 'Albums',
    },
  },
  list: {
    data: ref([
      { id: 1, name: 'The Beatles', genre: 'Rock', albums: 13 },
      { id: 2, name: 'Miles Davis', genre: 'Jazz', albums: 52 },
      { id: 3, name: 'Mozart', genre: 'Classical', albums: 100 },
      { id: 4, name: 'Taylor Swift', genre: 'Pop', albums: 10 },
    ]),
  },
})

// Nested Table (for table-in-modal demo)
const nestedTableForm = useForm({
  id: 'nested-table-form',
  record: {} as RecordObject<any>,
  fields: {
    title: {
      type: FieldType.text,
      label: 'Album Title',
      modelValue: '',
    },
    year: {
      type: FieldType.text,
      label: 'Year',
      modelValue: '',
    },
  },
})

const nestedTable = useTable({
  form: nestedTableForm,
  columns: {
    title: { label: 'Album' },
    year: { label: 'Year' },
  },
  list: {
    data: ref([
      { id: 1, title: 'Abbey Road', year: 1969 },
      { id: 2, title: 'Let It Be', year: 1970 },
      { id: 3, title: 'Rubber Soul', year: 1965 },
    ]),
  },
})
</script>

<style scoped>
code {
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
}
</style>

