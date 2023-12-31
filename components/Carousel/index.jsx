import React, {
  memo,
  useState,
  useRef,
  useEffect,
  useCallback,
  Children
} from "react"

function ReactSimplyCarousel({ responsiveProps = [], ...props }) {
  const [windowWidth, setWindowWidth] = useState(0)
  const [positionIndex, setPositionIndex] = useState(props.activeSlideIndex)

  const containerRef = useRef(null)
  const innerRef = useRef(null)
  const itemsListRef = useRef(null)

  const itemsListDragStartPosRef = useRef(0)
  const isListDraggingRef = useRef(false)

  const directionRef = useRef("")

  const autoplayTimerRef = useRef(null)
  const resizeTimerRef = useRef(null)

  const renderedSlidesCountRef = useRef(0)
  const firstRenderSlideIndexRef = useRef(positionIndex)

  const propsByWindowWidth = responsiveProps.reduce(
    (result, { minWidth = 0, maxWidth = null, ...item } = {}) => {
      if (windowWidth > minWidth && (!maxWidth || windowWidth <= maxWidth)) {
        return {
          ...result,
          ...item
        }
      }

      return result
    },
    props
  )

  const slidesItems = Children.toArray(propsByWindowWidth.children)

  const {
    containerProps: {
      style: containerStyle = {},
      onClickCapture: containerOnClickCapture = null,
      ...containerProps
    } = {},

    innerProps: { style: innerStyle = {}, ...innerProps } = {},
    itemsListProps: {
      style: itemsListStyle = {},
      onTouchStart: onItemsListTouchStart = null,
      onMouseDown: onItemsListMouseDown = null,
      onTransitionEnd: onItemsListTransitionEnd = null,
      ...itemsListProps
    } = {},
    backwardBtnProps: {
      children: backwardBtnChildren = null,
      show: showBackwardBtn = true,
      ...backwardBtnProps
    } = {},
    forwardBtnProps: {
      children: forwardBtnChildren = null,
      show: showForwardBtn = true,
      ...forwardBtnProps
    } = {},
    activeSlideProps: {
      className: activeSlideClassName = "",
      style: activeSlideStyle = {},
      ...activeSlideProps
    } = {},
    visibleSlideProps: {
      className: visibleSlideClassName = "",
      style: visibleSlideStyle = {},
      ...visibleSlideProps
    } = {},
    updateOnItemClick = false,
    activeSlideIndex,
    // @ts-ignore
    onRequestChange,
    speed = 0,
    delay = 0,
    easing = "linear",
    itemsToShow = 0,
    itemsToScroll = 1,
    // @ts-ignore
    children,
    // @ts-ignore
    onAfterChange,
    autoplay = false,
    autoplayDirection = "forward",
    disableNavIfAllVisible = true,
    hideNavIfAllVisible = true,
    centerMode = false,
    infinite = true,
    disableNavIfEdgeVisible = true,
    disableNavIfEdgeActive = true,
    dotsNav = {},
    persistentChangeCallbacks = false,
    autoplayDelay = 0
    // showSlidesBeforeInit = true,
  } = windowWidth
    ? {
        ...propsByWindowWidth,
        activeSlideIndex: Math.max(
          0,
          Math.min(propsByWindowWidth.activeSlideIndex, slidesItems.length - 1)
        ),
        itemsToShow: Math.min(
          slidesItems.length,
          propsByWindowWidth.itemsToShow || 0
        ),
        itemsToScroll: Math.min(
          slidesItems.length,
          propsByWindowWidth.itemsToScroll || 1
        )
      }
    : props

  const {
    show: showDotsNav = false,
    containerProps: dotsNavContainerProps = {},
    itemBtnProps: dotsNavBtnProps = {},
    activeItemBtnProps: dotsNavActiveBtnProps = {}
  } = dotsNav || {}

  const lastSlideIndex = Children.count(children) - 1
  const isAllSlidesVisible = itemsToShow === slidesItems.length
  const hideNav = hideNavIfAllVisible && isAllSlidesVisible
  const disableNav = disableNavIfAllVisible && isAllSlidesVisible
  const itemsListTransition =
    activeSlideIndex - positionIndex === 0 || !(speed || delay)
      ? "none"
      : `transform ${speed}ms ${easing} ${delay}ms`

  const getRenderParams = useCallback(
    ({
      correctionSlideIndex,
      prevCorrectionSlideIndex,
      curActiveSlideIndex
    }) => {
      const itemsListWidth = itemsListRef.current.offsetWidth
      const itemsListChildren = itemsListRef.current.children
      const itemsListChildrenCount = itemsListChildren.length

      const slidesHTMLElements = infinite
        ? [...itemsListChildren].slice(
            itemsListChildrenCount / 3 - prevCorrectionSlideIndex,
            itemsListChildrenCount / 3 -
              prevCorrectionSlideIndex +
              itemsListChildrenCount / 3
          )
        : [...itemsListChildren]

      const activeSlideWidth =
        slidesHTMLElements[curActiveSlideIndex].offsetWidth

      const innerMaxWidth = itemsToShow
        ? slidesHTMLElements.reduce((result, item, index) => {
            const isItemVisible =
              (index >= curActiveSlideIndex &&
                index < curActiveSlideIndex + itemsToShow) ||
              (index < curActiveSlideIndex &&
                index <
                  curActiveSlideIndex + itemsToShow - slidesHTMLElements.length)

            if (!isItemVisible) {
              return result
            }

            return result + item.offsetWidth
          }, 0)
        : innerRef.current.offsetWidth

      const itemsListMaxTranslateX = itemsListWidth - innerMaxWidth

      const offsetCorrectionForCenterMode =
        centerMode && infinite ? -(innerMaxWidth - activeSlideWidth) / 2 : 0

      const offsetCorrectionForInfiniteMode = infinite ? itemsListWidth / 3 : 0

      const offsetCorrectionForEdgeSlides =
        // eslint-disable-next-line no-nested-ternary
        correctionSlideIndex - curActiveSlideIndex === 0
          ? 0
          : // eslint-disable-next-line no-nested-ternary
          directionRef.current === "forward" &&
            curActiveSlideIndex < correctionSlideIndex
          ? offsetCorrectionForInfiniteMode
          : directionRef.current === "backward" &&
            curActiveSlideIndex > correctionSlideIndex
          ? -offsetCorrectionForInfiniteMode
          : 0

      const isNewSlideIndex = curActiveSlideIndex - correctionSlideIndex !== 0

      const getItemsListOffsetBySlideIndex = slideIndex => {
        const offsetByIndex = slidesHTMLElements.reduce(
          (total, item, index) => {
            if (index >= slideIndex) {
              return total
            }

            return total + (item.offsetWidth || 0)
          },
          0
        )

        if (infinite) {
          return offsetByIndex
        }

        return Math.min(itemsListMaxTranslateX, offsetByIndex)
      }

      const positionIndexOffset =
        isNewSlideIndex && infinite
          ? getItemsListOffsetBySlideIndex(correctionSlideIndex)
          : 0
      const activeSlideIndexOffset =
        isNewSlideIndex || !infinite
          ? getItemsListOffsetBySlideIndex(curActiveSlideIndex)
          : 0

      const itemsListTranslateX = disableNav
        ? 0
        : activeSlideIndexOffset -
          positionIndexOffset +
          offsetCorrectionForCenterMode +
          offsetCorrectionForEdgeSlides +
          offsetCorrectionForInfiniteMode
      const itemsListTransform = `translateX(-${itemsListTranslateX}px)`

      const start = infinite
        ? offsetCorrectionForInfiniteMode + offsetCorrectionForCenterMode
        : Math.min(
            itemsListMaxTranslateX,
            slidesHTMLElements.reduce((res, item, index) => {
              if (index < curActiveSlideIndex) {
                return res + item.offsetWidth
              }

              return res
            }, 0)
          )
      const end = start + innerMaxWidth

      const slidesHTMLElementsDefault = slidesHTMLElements.map(
        (htmlElement, index) => ({
          slideIndex: index,
          htmlElement
        })
      )

      const slidesHTMLElementsInRender = infinite
        ? [
            ...slidesHTMLElements
              .slice(curActiveSlideIndex)
              .map((htmlElement, index) => ({
                slideIndex: index + curActiveSlideIndex,
                htmlElement
              })),
            ...slidesHTMLElementsDefault,
            ...slidesHTMLElementsDefault,
            ...slidesHTMLElements
              .slice(0, curActiveSlideIndex)
              .map((htmlElement, index) => ({
                slideIndex: index,
                htmlElement
              }))
          ]
        : slidesHTMLElementsDefault

      const visibilityItemsState = slidesHTMLElementsInRender.reduce(
        (result, { slideIndex, htmlElement }) => {
          const htmlElementWidth = htmlElement.offsetWidth

          if (
            (result.summ >= start && result.summ < end) ||
            (result.summ + htmlElementWidth > start &&
              result.summ + htmlElementWidth <= end)
          ) {
            result.items.push({
              slideIndex,
              isFullyVisible:
                result.summ + htmlElementWidth <= end && result.summ >= start
            })
          }

          // eslint-disable-next-line no-param-reassign
          result.summ += htmlElementWidth

          return result
        },
        {
          summ: 0,
          items: []
        }
      )

      const isFirstSlideVisible = !!visibilityItemsState.items.find(
        item => item.slideIndex === 0
      )

      const isLastSlideVisible = !!visibilityItemsState.items.find(
        item => item.slideIndex === slidesHTMLElements.length - 1
      )

      return {
        slidesHTMLElements,
        innerMaxWidth,
        itemsListMaxTranslateX,
        activeSlideWidth,
        offsetCorrectionForCenterMode,
        offsetCorrectionForInfiniteMode,
        itemsListTranslateX,
        itemsListTransform,
        visibleSlides: visibilityItemsState.items,
        isFirstSlideVisible,
        isLastSlideVisible
      }
    },
    [centerMode, disableNav, infinite, itemsToShow]
  )

  const {
    innerMaxWidth = 0,
    itemsListMaxTranslateX = 0,
    activeSlideWidth = 0,
    offsetCorrectionForCenterMode = 0,
    offsetCorrectionForInfiniteMode = 0,
    itemsListTranslateX = 0,
    itemsListTransform = "none",
    visibleSlides = []
  } = windowWidth
    ? getRenderParams({
        prevCorrectionSlideIndex: firstRenderSlideIndexRef.current,
        curActiveSlideIndex: activeSlideIndex,
        correctionSlideIndex: positionIndex
      })
    : {}

  const getNextSlideIndex = useCallback(
    direction => {
      if (direction === "forward") {
        const nextSlideIndex = activeSlideIndex + itemsToScroll
        const isOnEnd = nextSlideIndex > lastSlideIndex
        // eslint-disable-next-line no-nested-ternary
        const newSlideIndex = isOnEnd
          ? infinite
            ? nextSlideIndex - lastSlideIndex - 1
            : lastSlideIndex
          : nextSlideIndex

        return newSlideIndex
      }

      if (direction === "backward") {
        const nextSlideIndex = activeSlideIndex - itemsToScroll
        const isOnStart = nextSlideIndex < 0
        // eslint-disable-next-line no-nested-ternary
        const newSlideIndex = isOnStart
          ? infinite
            ? lastSlideIndex + 1 + nextSlideIndex
            : 0
          : nextSlideIndex

        return newSlideIndex
      }

      return activeSlideIndex
    },
    [activeSlideIndex, itemsToScroll, lastSlideIndex, infinite]
  )

  const updateActiveSlideIndex = useCallback(
    (newActiveSlideIndex, direction) => {
      directionRef.current = direction
      itemsListRef.current.style.transition =
        speed || delay ? `transform ${speed}ms ${easing} ${delay}ms` : "none"

      if (
        newActiveSlideIndex !== activeSlideIndex ||
        persistentChangeCallbacks
      ) {
        clearTimeout(autoplayTimerRef.current)

        const {
          visibleSlides: nextVisibleSlides,
          isFirstSlideVisible: nextIsFirstSlideVisible,
          isLastSlideVisible: nextIsLastSlideVisible
        } = getRenderParams({
          correctionSlideIndex: positionIndex,
          prevCorrectionSlideIndex: positionIndex,
          curActiveSlideIndex: newActiveSlideIndex
        })

        onRequestChange(newActiveSlideIndex, {
          visibleSlides: nextVisibleSlides,
          isFirstSlideVisible: nextIsFirstSlideVisible,
          isLastSlideVisible: nextIsLastSlideVisible
        })
      } else {
        itemsListDragStartPosRef.current = 0

        itemsListRef.current.style.transform = `translateX(-${offsetCorrectionForCenterMode +
          offsetCorrectionForInfiniteMode +
          (infinite ? 0 : itemsListTranslateX)}px)`
      }
    },
    [
      persistentChangeCallbacks,
      activeSlideIndex,
      offsetCorrectionForCenterMode,
      delay,
      easing,
      speed,
      onRequestChange,
      offsetCorrectionForInfiniteMode,
      infinite,
      itemsListTranslateX,
      positionIndex,
      getRenderParams
    ]
  )

  const startAutoplay = useCallback(() => {
    if (autoplay) {
      clearTimeout(autoplayTimerRef.current)

      autoplayTimerRef.current = setTimeout(() => {
        updateActiveSlideIndex(
          getNextSlideIndex(autoplayDirection),
          autoplayDirection
        )
      }, autoplayDelay || delay)
    }
  }, [
    autoplay,
    autoplayDirection,
    autoplayDelay,
    updateActiveSlideIndex,
    getNextSlideIndex,
    delay
  ])

  const handleContainerClickCapture = useCallback(
    event => {
      if (isListDraggingRef.current) {
        event.preventDefault()
        event.stopPropagation()

        if (containerOnClickCapture) {
          containerOnClickCapture(event)
        }
      }
    },
    [containerOnClickCapture]
  )

  const handleBackwardBtnClick = useCallback(() => {
    updateActiveSlideIndex(getNextSlideIndex("backward"), "backward")
  }, [updateActiveSlideIndex, getNextSlideIndex])

  const handleItemsListDrag = useCallback(
    // todo: replace any
    event => {
      isListDraggingRef.current = true

      const dragPos =
        event.touches && event.touches[0]
          ? event.touches[0].clientX
          : event.clientX

      const dragPosDiff =
        itemsListDragStartPosRef.current -
        dragPos +
        offsetCorrectionForCenterMode +
        offsetCorrectionForInfiniteMode +
        (infinite ? 0 : itemsListTranslateX)
      const minDragPos = 0
      // todo: replace by itemsListMaxTranslateX
      const maxDragPos =
        itemsListRef.current.offsetWidth - innerRef.current.offsetWidth
      const itemsListPos = Math.max(
        Math.min(minDragPos, -dragPosDiff),
        -maxDragPos
      )
      itemsListRef.current.style.transition = "none"
      itemsListRef.current.style.transform = `translateX(${itemsListPos}px)`
    },
    [
      offsetCorrectionForCenterMode,
      offsetCorrectionForInfiniteMode,
      infinite,
      itemsListTranslateX
    ]
  )

  const handleItemsListDragEnd = useCallback(
    // todo: replace any
    event => {
      itemsListRef.current.removeEventListener(
        "mouseout",
        handleItemsListDragEnd
      )
      itemsListRef.current.removeEventListener(
        "dragstart",
        handleItemsListDragEnd
      )

      document.removeEventListener("mousemove", handleItemsListDrag)
      document.removeEventListener("mouseup", handleItemsListDragEnd)

      document.removeEventListener("touchmove", handleItemsListDrag)
      document.removeEventListener("touchend", handleItemsListDragEnd)

      if (isListDraggingRef.current) {
        const dragPos =
          event.changedTouches && event.changedTouches.length
            ? event.changedTouches[event.changedTouches.length - 1].clientX
            : event.clientX

        const mousePosDiff = itemsListDragStartPosRef.current - dragPos

        const nextActiveSlide =
          // eslint-disable-next-line no-nested-ternary
          mousePosDiff > activeSlideWidth / 2
            ? {
                index: getNextSlideIndex("forward"),
                direction: "forward"
              }
            : mousePosDiff < -activeSlideWidth / 2
            ? {
                index: getNextSlideIndex("backward"),
                direction: "backward"
              }
            : {
                index: activeSlideIndex,
                direction: "forward"
              }

        if (nextActiveSlide.index === activeSlideIndex) {
          isListDraggingRef.current = false
        }

        updateActiveSlideIndex(nextActiveSlide.index, nextActiveSlide.direction)
      }
    },
    [
      activeSlideIndex,
      activeSlideWidth,
      updateActiveSlideIndex,
      getNextSlideIndex,
      handleItemsListDrag
    ]
  )

  const handleItemsListMouseDown = useCallback(
    event => {
      clearTimeout(autoplayTimerRef.current)

      if (!isListDraggingRef.current) {
        itemsListDragStartPosRef.current = event.clientX

        document.addEventListener("mousemove", handleItemsListDrag)
        document.addEventListener("mouseup", handleItemsListDragEnd)

        itemsListRef.current.addEventListener(
          "mouseout",
          handleItemsListDragEnd
        )
        itemsListRef.current.addEventListener(
          "dragstart",
          handleItemsListDragEnd
        )
      }

      if (onItemsListMouseDown) {
        onItemsListMouseDown(event)
      }
    },
    [handleItemsListDrag, handleItemsListDragEnd, onItemsListMouseDown]
  )

  const handleItemsListTouchStart = useCallback(
    event => {
      clearTimeout(autoplayTimerRef.current)

      if (!isListDraggingRef.current) {
        itemsListDragStartPosRef.current = event.touches[0].clientX

        document.addEventListener("touchmove", handleItemsListDrag)
        document.addEventListener("touchend", handleItemsListDragEnd)
      }

      if (onItemsListTouchStart) {
        onItemsListTouchStart(event)
      }
    },
    [handleItemsListDrag, handleItemsListDragEnd, onItemsListTouchStart]
  )

  const handleItemsListTransitionEnd = useCallback(
    event => {
      setPositionIndex(activeSlideIndex)

      if (onItemsListTransitionEnd) {
        onItemsListTransitionEnd(event)
      }
    },
    [activeSlideIndex, onItemsListTransitionEnd]
  )

  const handleForwardBtnClick = useCallback(() => {
    updateActiveSlideIndex(getNextSlideIndex("forward"), "forward")
  }, [updateActiveSlideIndex, getNextSlideIndex])

  const getSlideItemOnClick = ({ direction, index, onClick }) => {
    const slideItemOnClick = event => {
      const forwardDirectionValue = activeSlideIndex < index ? "forward" : ""
      const backwardDirectionValue = activeSlideIndex > index ? "backward" : ""

      updateActiveSlideIndex(
        index,
        direction || forwardDirectionValue || backwardDirectionValue
      )

      if (onClick) {
        onClick(event)
      }
    }

    return slideItemOnClick
  }

  const renderSlidesItems = (items, startIndex, isDisableNav) =>
    items.map((item, index) => {
      const {
        props: {
          className: itemClassName = "",
          onClick: itemOnClick = null,
          style: itemStyle = {},
          ...itemComponentProps
        } = {},
        ...slideComponentData
      } = item

      // eslint-disable-next-line no-nested-ternary
      const direction = infinite
        ? renderedSlidesCountRef.current >= slidesItems.length
          ? "forward"
          : "backward"
        : index >= activeSlideIndex
        ? "forward"
        : "backward"

      const isActive = index + startIndex === activeSlideIndex
      const isVisible = visibleSlides.find(
        slide => slide.slideIndex === index + startIndex
      )

      const className = `${itemClassName} ${direction} ${
        isActive ? activeSlideClassName : ""
      } ${isVisible ? visibleSlideClassName : ""}`
      const style = {
        ...itemStyle,
        ...(isVisible ? visibleSlideStyle : {}),
        ...(isActive ? activeSlideStyle : {}),
        boxSizing: "border-box",
        margin: 0
      }
      const onClick =
        !isDisableNav && updateOnItemClick
          ? getSlideItemOnClick({
              direction,
              index: index + startIndex,
              onClick: itemOnClick
            })
          : itemOnClick
      const slideProps = {
        role: "tabpanel",
        className,
        style,
        onClick,
        ...itemComponentProps,
        ...(isVisible ? visibleSlideProps : {}),
        ...(isActive ? activeSlideProps : {})
      }

      renderedSlidesCountRef.current += 1

      return {
        props: slideProps,
        ...slideComponentData
      }
    })

  useEffect(() => {
    itemsListDragStartPosRef.current = 0
    if (positionIndex === activeSlideIndex) {
      isListDraggingRef.current = false
    }
    directionRef.current = ""

    if (activeSlideIndex !== positionIndex) {
      if (!speed && !delay) {
        setPositionIndex(activeSlideIndex)
      }
    } else {
      if (onAfterChange) {
        onAfterChange(activeSlideIndex, positionIndex)
      }

      if (
        infinite ||
        (autoplayDirection === "forward" &&
          activeSlideIndex !== lastSlideIndex) ||
        (autoplayDirection === "backward" && activeSlideIndex !== 0)
      ) {
        startAutoplay()
      }
    }

    return () => {
      clearTimeout(autoplayTimerRef.current)
    }
  }, [
    positionIndex,
    activeSlideIndex,
    onAfterChange,
    speed,
    delay,
    startAutoplay,
    infinite,
    lastSlideIndex,
    autoplayDirection
  ])

  useEffect(() => {
    if (windowWidth) {
      startAutoplay()
    }

    return () => {
      clearTimeout(autoplayTimerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowWidth])

  useEffect(() => {
    const itemsListRefDOMElement = itemsListRef.current

    function handleWindowResize() {
      clearTimeout(resizeTimerRef.current)
      clearTimeout(autoplayTimerRef.current)

      resizeTimerRef.current = setTimeout(() => {
        if (windowWidth !== window.innerWidth) {
          setWindowWidth(window.innerWidth)
        }
      }, 400)
    }

    if (windowWidth !== window.innerWidth) {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleWindowResize)

    return () => {
      clearTimeout(resizeTimerRef.current)
      window.removeEventListener("resize", handleWindowResize)

      document.removeEventListener("mousemove", handleItemsListDrag)
      document.removeEventListener("mouseup", handleItemsListDragEnd)
      document.removeEventListener("touchmove", handleItemsListDrag)
      document.removeEventListener("touchend", handleItemsListDragEnd)

      itemsListRefDOMElement.removeEventListener(
        "mouseout",
        handleItemsListDragEnd
      )
      itemsListRefDOMElement.removeEventListener(
        "dragstart",
        handleItemsListDragEnd
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleItemsListDrag, handleItemsListDragEnd])

  renderedSlidesCountRef.current = 0
  firstRenderSlideIndexRef.current = positionIndex

  return (
    <div
      onClickCapture={handleContainerClickCapture}
      style={{
        display: "flex",
        flexFlow: "row wrap",
        boxSizing: "border-box",
        justifyContent: "center",
        width: `100%`,
        ...containerStyle
      }}
      {...containerProps}
      ref={containerRef}
    >
      {showBackwardBtn && !hideNav && (
        <button
          {...backwardBtnProps}
          type="button"
          onClick={
            ((itemsListTranslateX === 0 && disableNavIfEdgeVisible) ||
              (activeSlideIndex === 0 && disableNavIfEdgeActive)) &&
            !infinite
              ? undefined
              : handleBackwardBtnClick
          }
          disabled={
            typeof backwardBtnProps.disabled === "boolean"
              ? backwardBtnProps.disabled
              : !!(
                  ((itemsListTranslateX === 0 && disableNavIfEdgeVisible) ||
                    (activeSlideIndex === 0 && disableNavIfEdgeActive)) &&
                  !infinite
                )
          }
        >
          {backwardBtnChildren}
        </button>
      )}

      <div
        {...innerProps}
        style={{
          ...innerStyle,
          display: "flex",
          boxSizing: "border-box",
          flexFlow: "row wrap",
          padding: "0",
          overflow: "hidden",
          // eslint-disable-next-line no-nested-ternary
          // maxWidth: innerMaxWidth ? `${innerMaxWidth}px` : undefined,
          // flex: !innerMaxWidth ? `1 0` : undefined
        }}
        ref={innerRef}
      >
        {/* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */}
        <div
          {...itemsListProps}
          style={{
            ...itemsListStyle,
            display: "flex",
            boxSizing: "border-box",
            outline: "none",
            transition: itemsListTransition,
            transform: itemsListTransform
          }}
          onTouchStart={!disableNav ? handleItemsListTouchStart : undefined}
          onMouseDown={!disableNav ? handleItemsListMouseDown : undefined}
          onTransitionEnd={
            speed || delay ? handleItemsListTransitionEnd : undefined
          }
          tabIndex={-1}
          role="presentation"
          ref={itemsListRef}
        >
          {infinite &&
            renderSlidesItems(
              slidesItems.slice(positionIndex),
              positionIndex,
              disableNav
            )}
          {renderSlidesItems(slidesItems, 0, disableNav)}
          {infinite && renderSlidesItems(slidesItems, 0, disableNav)}
          {infinite &&
            renderSlidesItems(
              slidesItems.slice(0, positionIndex),
              0,
              disableNav
            )}
        </div>
      </div>

      {showForwardBtn && !hideNav && (
        <button
          {...forwardBtnProps}
          type="button"
          onClick={
            ((itemsListTranslateX === itemsListMaxTranslateX &&
              disableNavIfEdgeVisible) ||
              (activeSlideIndex === lastSlideIndex &&
                disableNavIfEdgeActive)) &&
            !infinite
              ? undefined
              : handleForwardBtnClick
          }
          disabled={
            typeof forwardBtnProps.disabled === "boolean"
              ? forwardBtnProps.disabled
              : !!(
                  ((itemsListTranslateX === itemsListMaxTranslateX &&
                    disableNavIfEdgeVisible) ||
                    (activeSlideIndex === lastSlideIndex &&
                      disableNavIfEdgeActive)) &&
                  !infinite
                )
          }
        >
          {forwardBtnChildren}
        </button>
      )}

      {!!showDotsNav && (
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
          {...dotsNavContainerProps}
        >
          {Array.from({
            length: Math.ceil(slidesItems.length / itemsToScroll)
          }).map((_item, index) => (
            <button
              type="button"
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              title={`${index}`}
              {...dotsNavBtnProps}
              {...(activeSlideIndex >= index * itemsToScroll &&
              activeSlideIndex <
                Math.min(itemsToScroll * (index + 1), lastSlideIndex + 1)
                ? dotsNavActiveBtnProps
                : {})}
              onClick={() => {
                updateActiveSlideIndex(
                  Math.min(index * itemsToScroll, slidesItems.length - 1),
                  Math.min(index * itemsToScroll, slidesItems.length - 1) >
                    activeSlideIndex
                    ? "forward"
                    : "backward"
                )
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default memo(ReactSimplyCarousel)
