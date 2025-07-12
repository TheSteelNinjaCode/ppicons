<?php

namespace Lib\PPIcons;

use Lib\PHPX\PHPX;

class __COMPONENT_NAME__ extends PHPX
{
    public ?string $class = '';

    public function __construct(array $props = [])
    {
        parent::__construct($props);
    }

    public function render(): string
    {
        $attributes = $this->getAttributes();
        $class = $this->getMergeClasses($this->class);

        return <<<HTML
        __SVG_CODE__
        HTML;
    }
}
