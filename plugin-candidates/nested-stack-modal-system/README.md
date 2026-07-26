# Nested Stack Modal System - Documentation Index

This directory contains a sophisticated modal stacking system with carousel animations, designed for unlimited modal nesting. Below is a guide to understanding and implementing this system in FancyCrud.

---

## 📚 Documentation Overview

### 🎯 [RECOMMENDATION.md](./RECOMMENDATION.md) - **START HERE**
**Executive decision document comparing two implementation approaches**

- **Approach 1**: Standalone plugin (`@fancy-crud/plugin-modal-stack`)
- **Approach 2**: Core vue package integration ⭐ **RECOMMENDED**

**Key Recommendation**: Integrate directly into `@fancy-crud/vue` package as a core feature rather than creating a separate plugin.

**Why?**
- ✅ Zero breaking changes
- ✅ Seamless wrapper integration  
- ✅ No extra dependency to install
- ✅ Better user experience
- ✅ Automatic FTable enhancement

---

### 🏗️ [FANCY_CRUD_INTEGRATION.md](./FANCY_CRUD_INTEGRATION.md) - **IMPLEMENTATION PLAN**
**Comprehensive 40+ page integration strategy for making this the default modal system**

**Covers:**
- Current architecture analysis (FModal → Wrappers flow)
- Detailed integration plan (8 phases)
- Wrapper-specific implementation (all 5 wrappers)
- FTable auto-integration strategy
- Configuration & defaults system
- Migration path (zero breaking changes)
- Testing strategy (unit, integration, E2E)
- Real-world examples and code samples

**Timeline**: 8-week implementation plan with clear milestones

**Key Features:**
- `modal-id` prop (optional) - enables stacking
- `useModalStack` composable in vue package
- Auto-generated modal IDs in FTable
- Full wrapper compatibility (PrimeVue, Element Plus, Quasar, Vuetify, Oruga)

---

### 📋 [implementation.md](./implementation.md) - **PLUGIN ALTERNATIVE**
**Original standalone plugin implementation plan**

This document outlines how to create a separate `@fancy-crud/plugin-modal-stack` package if you prefer the plugin approach.

**Note**: This is NOT the recommended approach. See RECOMMENDATION.md for why integration is better.

**Covers:**
- Plugin package structure
- TypeScript conversion of existing code
- Component migration strategy
- Styling options (CSS variables, Tailwind considerations)
- Enhanced features (events, keyboard nav, focus management)
- Testing and documentation strategy

---

## 📂 Current System Files

### Composable
- **`composables/useModalStack.js`** - Global modal state management
  - Registration/unregistration system
  - Stack management (LIFO)
  - Position calculation (`active-first`, `active-left`, `shifted-N`)
  - Z-index management

### Components
- **`ModalContainer.vue`** - Individual modal wrapper
  - Positioning logic
  - Animation handling
  - Responsive behavior
  - Supports unlimited nesting via dynamic transforms

- **`ModalOverlay.vue`** - Backdrop overlay
  - Fade transition
  - Click-to-close (when single modal)
  - Visibility based on stack state

---

## 🎨 System Features

### Core Capabilities
- ✨ **Unlimited Modal Nesting** - No hardcoded depth limits
- 🎬 **Smooth Carousel Animations** - Hardware-accelerated CSS transitions
- 📐 **Dynamic Positioning** - Active and shifted states
- 📱 **Responsive Design** - Mobile and desktop optimized
- 🎯 **Auto Z-Index Management** - No conflicts
- ⌨️ **Keyboard Navigation** - ESC key support (planned)
- ♿ **Accessibility** - Focus management (planned)

### Position States
1. **`active-first`** - First/center modal (slides from right)
2. **`active-left`** - Subsequent active modals (slides from left, positioned left)
3. **`shifted-N`** - Background stacked modals (carousel effect, shifted right)

### Animation Behavior
```
Modal 1 opens → Slides from right to center (active-first)
Modal 2 opens → Modal 1 shifts right (shifted-1)
             → Modal 2 slides from left (active-left)
Modal 3 opens → Modal 1 shifts further (shifted-2)
             → Modal 2 shifts right (shifted-1)
             → Modal 3 slides from left (active-left)
```

---

## 🚀 Quick Start (Recommended Integration Approach)

### For Users

Once integrated, using modal stacking is as simple as adding a prop:

```vue
<template>
  <f-table v-bind="table">
    <!-- Modals in FTable automatically use stacking -->
    
    <template #table-form>
      <f-form v-bind="form">
        <!-- Add nested modal with just modal-id prop -->
        <f-modal v-model="showNested" modal-id="nested-form">
          <f-form v-bind="nestedForm" />
        </f-modal>
      </f-form>
    </template>
  </f-table>
</template>
```

**That's it!** No configuration, no plugins, no setup. Just add `modal-id`.

### For Developers

Integration requires updating:
1. `@fancy-crud/vue` - Add `useModalStack` composable
2. `@fancy-crud/wrapper-*` - Enhance each wrapper modal
3. `FTable.vue` - Auto-generate modal IDs

See [FANCY_CRUD_INTEGRATION.md](./FANCY_CRUD_INTEGRATION.md) for complete implementation guide.

---

## 📊 Implementation Comparison

| Aspect | Plugin Approach | Integration Approach ⭐ |
|--------|-----------------|------------------------|
| User setup | Install package + configure | Zero setup |
| Wrapper support | Manual integration | Automatic |
| FTable integration | Manual | Automatic |
| Breaking changes | Some possible | Zero |
| Bundle impact | External dep | +5KB in vue |
| Maintenance | Separate package | Core package |
| Adoption friction | High | Low |

---

## 🗺️ Implementation Roadmap

### Phase 1: Foundation (Week 1-2)
- Add `useModalStack` to `@fancy-crud/vue`
- Update `FModal` with optional `modal-id` prop
- Write unit tests

### Phase 2: Wrapper Integration (Week 3-4)
- Update all 5 wrapper modals
- Standardize stack-aware styling
- Integration testing

### Phase 3: FTable Enhancement (Week 5)
- Auto-generate modal IDs
- Test nested CRUD scenarios

### Phase 4: Testing & Polish (Week 6)
- E2E testing
- Accessibility testing
- Performance optimization

### Phase 5: Documentation (Week 7)
- User guides
- API reference
- Example implementations

### Phase 6: Release (Week 8)
- Beta testing
- Final release
- Community announcement

---

## 🎯 Success Criteria

### Technical
- [ ] All 5 wrappers support stacking
- [ ] Zero breaking changes in existing code
- [ ] < 5KB bundle size increase
- [ ] > 90% test coverage
- [ ] Passes WCAG 2.1 accessibility standards

### User Experience
- [ ] Smooth 60fps animations
- [ ] Intuitive navigation (back, close all)
- [ ] Mobile and desktop responsive
- [ ] Clear visual hierarchy
- [ ] Keyboard accessible

### Documentation
- [ ] Comprehensive API docs
- [ ] Working examples for each wrapper
- [ ] Video tutorials
- [ ] Migration guide (minimal due to backward compatibility)

### Adoption
- [ ] Used in 2+ demo applications
- [ ] Positive community feedback
- [ ] No major bugs in first month
- [ ] Active usage in production apps

---

## 🤔 Decision Time

### Choose Your Path

**Option A: Integration (Recommended) ⭐**
- Read: [FANCY_CRUD_INTEGRATION.md](./FANCY_CRUD_INTEGRATION.md)
- Benefits: Zero breaking changes, seamless experience, better DX
- Timeline: 8 weeks to full release

**Option B: Plugin (Alternative)**
- Read: [implementation.md](./implementation.md)
- Benefits: Separate versioning, opt-in dependency
- Timeline: 5 weeks + wrapper integration time

**Need Help Deciding?**
- Read: [RECOMMENDATION.md](./RECOMMENDATION.md)
- Bottom line: Integration is better for FancyCrud's use case

---

## 📝 Notes

### Current Status
- ✅ Proof of concept complete
- ✅ Components working in demo
- ✅ Unlimited nesting verified
- ✅ Animations smooth and performant
- ⏳ Needs TypeScript conversion
- ⏳ Needs wrapper integration
- ⏳ Needs testing suite
- ⏳ Needs documentation

### Known Limitations
- Currently uses Tailwind classes (needs CSS conversion)
- No keyboard navigation yet (ESC key)
- No focus management yet
- Mobile responsiveness needs refinement
- Accessibility features planned but not implemented

### Future Enhancements
- Modal history/breadcrumbs
- URL state synchronization
- Animation presets
- Multi-stack support (different modal groups)
- Drag-to-reorder modals
- Modal minimization/docking

---

## 🤝 Contributing

This system is currently in the design/planning phase. Feedback welcome on:
- Integration approach vs plugin approach
- Wrapper-specific concerns
- Animation preferences
- API design
- Accessibility requirements
- Mobile UX

---

## 📧 Questions?

If you have questions about:
- **Architecture decisions** → See RECOMMENDATION.md
- **Integration details** → See FANCY_CRUD_INTEGRATION.md
- **Plugin alternative** → See implementation.md
- **Current implementation** → Check existing .vue and .js files
- **Anything else** → Open an issue or start a discussion

---

## 🎬 Next Steps

1. **Review** RECOMMENDATION.md for decision rationale
2. **Read** FANCY_CRUD_INTEGRATION.md for detailed plan
3. **Decide** on integration vs plugin approach
4. **Start** implementing (recommend starting with PrimeVue proof of concept)
5. **Test** with real-world scenarios
6. **Iterate** based on feedback
7. **Document** as you go
8. **Release** incrementally (beta → stable)

---

## License

MIT - Same as FancyCrud core

---

*Last Updated: 2025-10-11*

