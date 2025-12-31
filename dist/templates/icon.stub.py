from utils.html_attrs import get_attributes, merge_classes
from utils.component_decorator import component


@component
def __COMPONENT_NAME__(**props):
    incoming_class = props.get("class", "")
    final_class = merge_classes("", incoming_class)
    attributes = get_attributes(props, {
        "class": final_class
    })

    return f'__SVG_CODE__'
