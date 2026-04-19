from casp.html_attrs import get_attributes, merge_classes
from casp.component_decorator import component


@component
def __COMPONENT_NAME__(**props):
    incoming_class = props.get("class", "")
    final_class = merge_classes("", incoming_class)
    attributes = get_attributes({
        "class": final_class
    }, props)

    return f'__SVG_CODE__'