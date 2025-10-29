<?php

namespace __NAMESPACE__;

use PP\PHPX\PHPX;

class __COMPONENT_NAME__ extends PHPX
{
    public ?string $class = '';

    public function __construct(array $props = [])
    {
        parent::__construct($props);
    }

    public function render(): string
    {
        $class = $this->getMergeClasses("size-24", $this->class);
        $attributes = $this->getAttributes([
            'class' => $class,
        ]);

        return <<<HTML
        __SVG_CODE__
        HTML;
    }
}
