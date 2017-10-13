// @flow
import React from "react"
import styled, { injectGlobal } from "styled-components"
import ReactCSSTransitionGroup from "react-addons-css-transition-group"

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  .modal-transition-enter {
    // opacity: 0;
    transform: translateY(-100%);
  }

  .modal-transition-enter.modal-transition-enter-active {
    // opacity: 1;
    transform: translateY(0);
    transition: transform 400ms ease-in-out;
  }

  .modal-transition-leave {
    opacity: 1;
    transform: translateY(0);
  }

  .modal-transition-leave.modal-transition-leave-active {
    transform: translateY(-100%);
    transition: transform 400ms ease-in-out;
  }
`

export const ModalFrame = styled.div`
  background: #efefef;
  border: 1px solid #ddd;
  border-top: none;
  box-shadow: 0 2px 25px #000;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI";
  position: fixed;
  top: 0;
  left: 50%;
  width: 500px;
  margin: 0 0 0 -250px;
  z-index: 1000;
`

export const ModalContent = styled.div`
  padding: 1em;
`

type ModalProps = {
  isOpen: bool,
  renderContent: React.Node
}
export default ({ isOpen, renderContent }: ModalProps) => (
  <ReactCSSTransitionGroup
    transitionName="modal-transition"
    transitionEnterTimeout={400}
    transitionLeaveTimeout={400}
  >
    {isOpen && (
      <ModalFrame>
        <ModalContent>
          {renderContent}
        </ModalContent>
      </ModalFrame>
    )}
  </ReactCSSTransitionGroup>
)

