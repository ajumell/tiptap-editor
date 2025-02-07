import {Extension} from '@tiptap/core'
import {Decoration, DecorationSet} from 'prosemirror-view'
import {Plugin} from 'prosemirror-state'

export const DraggableNodes = Extension.create({
  name: 'draggableNodes',

  addProseMirrorPlugins() {
    // Plugin that adds a drag handle widget to every block node.
    const dragHandleDecorationPlugin = new Plugin({
      props: {
        decorations(state) {
          const decorations = []
          state.doc.descendants((node, pos) => {
            if (node.isBlock) {
              // Add a widget decoration before each block node.
              decorations.push(
                Decoration.widget(
                  pos,
                  (view) => {
                    const handle = document.createElement('span')
                    // Add a CSS class to style the drag handle.
                    handle.className = 'drag-handle'
                    // Mark the handle as draggable.
                    handle.draggable = true

                    // When dragging starts, store the node’s start position.
                    handle.addEventListener('dragstart', (event) => {
                      // Save the original position in the drag data.
                      event.dataTransfer.setData('text/plain', pos.toString())
                      // Optionally add a visual cue.
                      handle.classList.add('dragging')
                    })

                    // Remove the visual cue when dragging ends.
                    handle.addEventListener('dragend', () => {
                      handle.classList.remove('dragging')
                    })

                    return handle
                  },
                  {side: -1} // Place the widget before the node.
                )
              )
            }
          })
          return DecorationSet.create(state.doc, decorations)
        },
      },
    })

    // Plugin that handles drop events and re‑arranges nodes.
    const dropPlugin = new Plugin({
      props: {
        handleDOMEvents: {
          drop: (view, event) => {
            const data = event.dataTransfer.getData('text/plain')
            if (!data) return false

            const fromPos = Number(data)
            if (isNaN(fromPos)) return false

            // Prevent the default drop behavior.
            event.preventDefault()

            // Find the drop position using the mouse coordinates.
            const dropCoords = {left: event.clientX, top: event.clientY}
            const dropResult = view.posAtCoords(dropCoords)
            if (!dropResult) return false

            let toPos = dropResult.pos
            const {state} = view
            const node = state.doc.nodeAt(fromPos)
            if (!node) return false

            // Adjust the drop position if moving downward.
            if (toPos > fromPos) {
              toPos = toPos - node.nodeSize
            }

            const tr = state.tr
            // Remove the node from its original location.
            tr.delete(fromPos, fromPos + node.nodeSize)
            // Insert the node at the new location.
            tr.insert(toPos, node)
            view.dispatch(tr)
            return true
          },
        },
      },
    })

    return [dragHandleDecorationPlugin, dropPlugin]
  },
})
