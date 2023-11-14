import { Delete, Download, Edit, Plus } from '@element-plus/icons-vue'

export const styles = {
  mainButton: {
    type: 'primary',
  },

  auxButton: {
  },

  addButton: {
    circle: true,
    icon: Plus,
    type: 'primary',
    plain: true,
  },

  editButton: {
    circle: true,
    icon: Edit,
    // variant: 'text',
  },

  removeButton: {
    circle: true,
    icon: Delete,
    type: 'danger',
    plain: true,
  },

  exportButton: {
    circle: true,
    icon: Download,
    // variant: 'text',
  },

  confirmButton: {
    type: 'danger',
    plain: true,
  },

  cancelButton: {
    type: 'primary',
  },

  // modal: {
  //   width: '600',
  // },

}
