// @flow
import React from "react"
import styled, { injectGlobal } from "styled-components"
import ReactCSSTransitionGroup from "react-addons-css-transition-group"

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  .modal-transition-enter {
    opacity: 0;
  }

  .modal-transition-enter.modal-transition-enter-active {
    opacity: 1;
    transition: opacity 400ms ease-in-out;
  }

  .modal-transition-leave {
    opacity: 1;
  }

  .modal-transition-leave.modal-transition-leave-active {
    opacity: 0;
    transition: opacity 400ms ease-in-out;
  }
`

const ModalContainer = styled.div`
  align-items: center;
  background: hsla(0, 0%, 0%, 0.5);
  bottom: 0;
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  left: 0;
  justify-content: space-around;
  overflow: hidden;
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 9005;
`

export const ModalFrame = styled.div`
  background: #2a2e3b;
  box-shadow: 0 2px 25px #000;
  border-radius: 6px;
  overflow: hidden;
`

export const ModalTitle = styled.div`
  border-bottom: 1px solid #000;
  background: hsla(0, 0%, 100%, 0.15);
  padding: 0.75em 1em;
  color: #fff;
`

export const ModalContent = styled.div`
  padding: 1em;
  color: #fff;
`

export const ModalButtons = styled.div`
  border-top: 1px solid hsla(0, 0%, 0%, 0.5);
  padding: 0.75em 1em;
  background: hsla(0, 0%, 0%, 0.2);
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

type ModalProps = {
  isOpen: bool,
  renderContent: React.Node,
  renderTitle: React.Node,
  renderButtons: React.Node,
  style?: Object
}
export default ({ isOpen, renderContent, renderTitle, renderButtons, style }: ModalProps) => (
  <ReactCSSTransitionGroup
    transitionName="modal-transition"
    transitionEnterTimeout={400}
    transitionLeaveTimeout={400}
  >
    {isOpen && (
      <ModalContainer>
        <ModalFrame style={style}>
          <ModalTitle>
            {renderTitle}
          </ModalTitle>
          <ModalContent>
            {renderContent}
          </ModalContent>
          <ModalButtons>
            {renderButtons}
          </ModalButtons>
        </ModalFrame>
      </ModalContainer>
    )}
  </ReactCSSTransitionGroup>
)

